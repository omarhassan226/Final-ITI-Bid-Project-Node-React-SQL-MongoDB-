const express = require("express");
const router = express.Router();
const upload = require("../../utils/multer");
const blogRouter = (blogController) => {
  router.post("/blogs", async (req, res) => {
    blogController.createBlog(req.body, req.files);
    try {
      await upload.uploadImage(req, res);
      const blog = await blogController.createBlog(req.body, req.files);
      res.status(201).json(blog);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.get(
    "/blogs/:blogId",
    async (req, res) => await blogController.getBlog(req, res)
  );
  router.get("/blogs", (req, res) => blogController.getAllBlogs(req, res));
  router.put("/blogs/:blogId", (req, res) =>
    blogController.updateBlog(req, res)
  );
  router.delete("/blogs/:blogId", (req, res) =>
    blogController.deleteBlog(req, res)
  );
  router.post("/blogs/:blogId/comments", (req, res) =>
    blogController.addComment(req, res)
  );
  router.delete("/blogs/:blogId/comments/:commentId", (req, res) =>
    blogController.deleteComment(req, res)
  );
  return router;
};

module.exports = blogRouter;
