const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    //   enum: ["Apple", "Samsung", "Lenovo"],
    required: true,
    },
    quantity: {
      type: Number,
      required:true
    },
    sold: {
      type: Number,
      default: 0,
      // select:false  //IF U WANT TO HIDE THIS THING FROM THE USER, ADD select:false
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
    //   enum: ["Black", "Blue", "Red"],
    required: true,
    },
    ratings: [
      {
        star: Number,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
