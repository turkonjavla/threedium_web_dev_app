const express = require('express');
const router = express.Router();

// @route GET api/posts
// @desc Test posts
// @access Public
router.get('/', async (req, res) => {
  res.send('Posts route');
});

module.exports = router;