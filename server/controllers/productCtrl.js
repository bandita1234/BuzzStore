const mongoose = require("mongoose");
const { validateMongodbId } = require("../utils/validateMongodbId");
const Product = require("../models/Product");
const User = require("../models/User");
const slugify = require("slugify");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

//ROUTE 1: CREATE A PRODUCT
const createProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
//ROUTE 4: UPDATE PRODUCTS
const updateproduct = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  // console.log(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
    // console.log(updatedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 2: GET A PRODUCT
const getaproduct = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const getproduct = await Product.findById(id).populate("color");
    res.json(getproduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 3: GET ALL PRODUCTS
const getallproducts = async (req, res) => {
  // console.log(req.query);
  try {
    //1 . FILTERING

    // WAY - 1
    // const allproducts = await Product.find(req.query);

    // WAY - 2

    // const allproducts = await Product.find({
    //   brand : req.query.brand,
    //   category : req.query.category
    // })

    // WAY - 3
    // const allproducts = await Product.where("price").equals(req.query.price);

    //way - 4(main)

    const QueryObj = { ...req.query };
    // console.log(QueryObj);

    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((ele) => delete QueryObj[ele]);
    // console.log(QueryObj);

    //For filtering price in >= or <= i.e gte|gt...etc
    let queryStr = JSON.stringify(QueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);
    let query = Product.find(JSON.parse(queryStr));

    //2 . SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //3. LIMITING THE FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields); //IF U WANT TO SHOW ONLY SOME LIMITING FIELDS LIKE TITLE,PRICE...
    } else {
      query = query.select("-__v");
    }

    //4. PAGINATION
    const page = req.query.page;
    const limit = req.query.limit;

    const skip = (page - 1) * limit;
    // console.log(page,limit,skip);

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments(); //Total no. of items
      if (skip >= productCount) {
        res.status(404).json("This page doesn't exists!!");
      }
    }

    const allproducts = await query;

    res.json(allproducts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 5: DELETE PRODUCTS
const deleteproduct = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  // console.log(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
    // console.log(updatedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 6: ADDING PRODUCTS TO WISHLIST
const addToWishlist = async (req, res) => {
  const { _id } = req?.user;
  console.log(_id);
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 7: PRODUCT RATINGS
const rating = async (req, res) => {
  const { _id } = req?.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated }, //To get the already rated rating
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
      // res.json(updateRating)
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      // res.json(rateProduct)
    }

    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);

    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const uploadImages = async (req, res) => {
  // console.log(req.files);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      // console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

const deleteImages = async (req, res) => {
  // console.log(req.files);
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
module.exports = {
  createProduct,
  getaproduct,
  getallproducts,
  updateproduct,
  deleteproduct,
  addToWishlist,
  rating,
  uploadImages,
  deleteImages,
};
