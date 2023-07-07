const User = require("../models/User");
const Blog = require("../models/Blog");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
    //if we do .populate, instead of only getting the id in the likes route, we'll grt the whole user deatails
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const getallBlogs = await Blog.find();
    res.json(getallBlogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const blogLike = async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  try {
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;

    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId }, //pull the login user id from the dislikes and make isDisliked false
          isDisliked: false,
        },
        {
          new: true,
        }
      );
      res.json(blog);
    }

    //If the post is already liked before
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId }, //pull the login user id from the likes and make isliked false
          isLiked: false,
        },
        {
          new: true,
        }
      );
      res.json(blog);
    } else {
      //Like the blog
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const blogdislike = async (req, res) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisLiked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  blogLike,
  blogdislike,
};
