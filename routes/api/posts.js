const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

const authMiddleware = require('../../middleware/authMiddleware');

/* Models */
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route POST api/posts
// @desc Create a post
// @access Private
router.post('/', [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('text', 'Text is required')
    .not()
    .isEmpty(),
  authMiddleware
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      headerImgUrl: req.body.headerImgUrl,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();

    res
      .status(200)
      .json(post);
  }
  catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send('Server error');
  }
});

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res
      .status(200)
      .json(posts);
  }
  catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send('Server error');
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Article not found' });
    }

    res
      .status(200)
      .json(post);
  }
  catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Article not found' });
    }

    res
      .status(500)
      .send('Server error');
  }
});

// @route POST api/posts/update/:id
// @desc Update article
// @access Private
router.post('/update/:id', [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('text', 'Text is required')
    .not()
    .isEmpty(),
  authMiddleware
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);


    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized' });
    }

    if (req.body.title) { post.title = req.body.title; }
    if (req.body.text) { post.text = req.body.text; }
    post.headerImgUrl = req.body.headerImgUrl;

    const updatedPost = await post.save();
    res
      .status(200)
      .json(updatedPost);
  }
  catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Article not found' });
    }

    res
      .status(500)
      .send('Server error');
  }
})

// @route DELETE api/posts/:id
// @desc Delete a post by id
// @access Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ msg: 'Article not found' });
    }

    // check if user is owner of post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to do that' });
    }

    await post.remove();
    res
      .status(200)
      .json({ msg: "Article removed" });
  }
  catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Article not found' });
    }

    res
      .status(500)
      .send('Server error');
  }
});

// @route GET api/posts/user/:user_id
// @desc Get posts by user id
// @access Private
router.get('/user/:user_id', authMiddleware, async (req, res) => {
  try {
    const posts = await Post
      .find({ user: req.params.user_id })
      .populate('User', ['name', 'avatar']);

    if (!posts) {
      return res
        .status(400)
        .json({ msg: 'Articles not found' });
    }
    res
      .status(200)
      .json(posts);
  }
  catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'Article not found' });
    }

    res
      .status(500)
      .send('Server error');
  }
});

module.exports = router;