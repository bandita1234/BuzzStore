const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    // refreshToken : {
    //   type : String
    // }
  },
  {
    timestamps: true,
  }
);

//when we save this model..password hashing
UserSchema.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//For login to check if the password matched
UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", UserSchema);
