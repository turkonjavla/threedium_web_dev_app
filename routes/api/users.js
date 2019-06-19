const express = require('express');
const router = express.Router();

// @route GET api/users
// @desc Test user
// @access Public
router.get('/', async (req, res) => {
  res.send('Users route');
});

module.exports = router;