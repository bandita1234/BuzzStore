const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
     default:0
    },
    isLiked : {
        type : Boolean,
        default : false
    },
    isDisLiked : {
        type : Boolean,
        default : false
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    dislikes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    image : {
        type : String,
        default : "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    author : {
        type : String,
        default : "Admin"
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
