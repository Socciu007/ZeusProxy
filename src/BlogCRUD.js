const express = require("express");
const path = require("path");
const router = express.Router();
const Blog = require("./BlogModel");
const BlogService = require("./BlogService");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render(path.join(__dirname, "views/blogs.ejs"), {
      blogs: blogs,
    });
  } catch (error) {
    res.status(404).json({
      status: "ERR",
      message: "Loi khi lay du lieu MongoDB",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is require.",
      });
    }

    const response = await BlogService.createBlog(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: error,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = req.body;

    const response = await BlogService.updateBlog(blogId, data);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: error,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    const response = await BlogService.deleteBlog(blogId);
    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: error,
    });
  }
});

const routes = (app) => {
  app.use("/blog", router);
};

module.exports = routes;
