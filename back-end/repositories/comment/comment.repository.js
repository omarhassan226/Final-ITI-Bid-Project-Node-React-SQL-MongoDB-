const Comment = require('../../models/comment/comment.model');

class CommentRepository {
    async createComment(data) {
        const comment = new Comment(data);
        await comment.save();
        return comment;
    }

    async getCommentsByBlog(blogId) {
        return await Comment.find({ blog: blogId }).populate('author').exec();
    }

    async deleteComment(commentId) {
        return await Comment.findByIdAndRemove(commentId).exec();
    }
}

module.exports = CommentRepository;
