const express = require("express");
const path = require("path");
const router = express.Router();
const Blog = require("./modelBlog");

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
    console.log(req.body);

    if (!title || !description || !image) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is require.",
      });
    }

    const blogs = await Blog.create({ title, description, image });
    if (blogs) {
      return res.status(200).json({
        status: "OK",
        data: blogs,
      });
    }
    // res.render(path.join(__dirname, "views/blog.ejs"), {
    //     blogs: blogs,
    // });
  } catch (error) {
    console.log(req.body);
    res.status(404).json({
      status: "ERR",
      message: "Loi khi lay du lieu MongoDB",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = req.body;

    const blog = await Blog.findOne({
      _id: id,
    });

    if (blog === null) {
      resolve({
        status: "ERR",
        message: "The blog is not exist",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, data, {
      new: true,
    });
    return res.status(200).json({
      status: "OK",
      message: "Success",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(404).json({
      status: error,
    });
  }
});

module.exports = router;
