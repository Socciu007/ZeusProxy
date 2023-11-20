const Blog = require("./BlogModel");

const getAllBlog = async (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalBlog = await Blog.count();

      if (sort) {
        const objSort = {};
        objSort[sort[1]] = sort[0];
        const sortBlog = await Blog.find()
          .limit(limit)
          .skip(limit * page)
          .sort(objSort);
        resolve({
          status: "OK",
          message: "Success",
          data: sortBlog,
          total: totalBlog,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalBlog / limit),
        });
      }

      if (filter) {
        console.log(filter);
        const filterBlog = await Blog.find({
          [filter[0]]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);
        resolve({
          status: "OK",
          message: "Success",
          data: filterBlog,
          total: totalBlog,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalBlog / limit),
        });
      }

      const blogs = await Blog.find()
        .limit(limit)
        .skip(limit * page);

      resolve({
        status: "OK",
        message: "Success",
        data: blogs,
        total: totalBlog,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalBlog / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsBlog = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await Blog.findOne({
        _id: id,
      });

      if (blog) {
        resolve({
          status: "ERR",
          message: "The blog is not exist",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
        data: blog,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createBlog = async (newBlog) => {
  return new Promise(async (resolve, reject) => {
    const { title, description, image } = newBlog;
    console.log("data", title, description, image);
    try {
      const checkBlog = await Blog.find({
        title: title,
      });
      if (checkBlog !== null) {
        resolve({
          status: "ERR",
          message: "The blog is already.",
        });
      }
      const createdBlog = await Blog.create({ title, description, image });
      if (createdBlog) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdBlog,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateBlog = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await Blog.findOne({
        _id: id,
      });

      if (blog === null) {
        resolve({
          status: "OK",
          message: "The blog is not exist",
        });
      }
      const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "OK",
        message: "Success",
        data: updatedBlog,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBlog = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await Blog.findOne({
        _id: id,
      });

      if (blog === null) {
        resolve({
          status: "OK",
          message: "The blog is not exist",
        });
      }
      await Blog.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete blog is success.",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllBlog,
  getDetailsBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
