class CommentController {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    async createComment(req, res) {
        try {
            const comment = await this.commentRepository.createComment(req.body);
            res.status(201).json({ message: 'Comment created successfully', comment });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getCommentsByBlog(req, res) {
        try {
            const comments = await this.commentRepository.getCommentsByBlog(req.params.blogId);
            res.status(200).json(comments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async deleteComment(req, res) {
        try {
            await this.commentRepository.deleteComment(req.params.commentId);
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = CommentController;
