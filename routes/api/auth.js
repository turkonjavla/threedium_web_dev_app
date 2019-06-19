const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Test auth
// @access Public
router.get('/', async (req, res) => {
  res.send('Auth route');
});

module.exports = router;