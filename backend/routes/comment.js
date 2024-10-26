const express = require('express');
const router = express.Router();
const { addCommnt, posts } = require('../controller/comment');

module.exports = (io) => {
  router.get('/posts/:username', posts);

  router.post('/:bookId/comments', (req, res) => {
    addCommnt(req, res, io);  // Pass the io instance to the controller function
  });

  return router;
};
