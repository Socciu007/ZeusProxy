const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Blog = mongoose.model("Blog", blogSchema, "blog");
module.exports = Blog;
