const express = require('express');
const router = express.Router();

const commentRouter = (commentController) => {
    router.post('/comments', (req, res) => commentController.createComment(req, res));
    router.get('/comments/:blogId', (req, res) => commentController.getCommentsByBlog(req, res));
    router.delete('/comments/:commentId', (req, res) => commentController.deleteComment(req, res));
    return router;
}

module.exports = commentRouter;
