class BlogController {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }

    async createBlog(body, files) {
        try {
            (files);
            const blog = await this.blogRepository.createBlog(body , files);
            (blog);
            return { msg: 'product added successfully', blog };
            // res.status(201).json({ message: 'Blog created successfully', blog });
        } catch (err) {
            console.error(err);
            return { msg: "failed to add product", err: err.message };
            // res.status(500).json({ message: err.message });
        }
    }

    async getBlog(req, res) {
        try {
            const blog = await this.blogRepository.getBlog(req.params.blogId);
            res.status(200).json(blog);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getAllBlogs(req, res) {
        try {
            const blogs = await this.blogRepository.getAllBlogs();
            res.status(200).json(blogs);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async updateBlog(req, res) {
        try {
            const blog = await this.blogRepository.updateBlog(req.params.blogId, req.body);
            res.status(200).json({ message: 'Blog updated successfully', blog });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async deleteBlog(req, res) {
        try {
            await this.blogRepository.deleteBlog(req.params.blogId);
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async addComment(req, res) {
        try {
            const blog = await this.blogRepository.addComment(req.params.blogId, req.body);
            res.status(201).json({ message: 'Comment added successfully', blog });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }

    async deleteComment(req, res) {
        try {
            const blog = await this.blogRepository.deleteComment(req.params.blogId, req.params.commentId);
            res.status(200).json({ message: 'Comment deleted successfully', blog });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = BlogController;
