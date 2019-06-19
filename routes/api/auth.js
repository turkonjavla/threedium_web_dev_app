const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const authMiddleware = require('../../middleware/authMiddleware');

const User = require('../../models/User');

// @route GET api/auth
// @desc Get auth user
// @access Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
  catch (error) {
    console.error(error);
    res
      .status(500)
      .send('Server error');
  }
});

// @route POST api/auth
// @desc Auth user & get token
// @access Public
router.post('/', [
  check('email', 'Please provide a valid email')
    .isEmail(),
  check('password', 'Password is required')
    .exists()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid email or password' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid email or password' }] })
    }

    // return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }

    const { JWT_SECRET } = process.env;

    jwt
      .sign(
        payload,
        JWT_SECRET,
        { expiresIn: 43200 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
  }
  catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send('Server error')
  }
});

module.exports = router;