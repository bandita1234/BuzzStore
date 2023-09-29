const { generateToken } = require("../config/jwtToken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Coupon = require("../models/Coupon");
const Order = require("../models/Order");
const { validationResult, cookie } = require("express-validator");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailCtrl");
const uniqid = require("uniqid");

//ROUTE 1: CREATE A USER (REGISTER)
const createUser = async (req, res) => {
  // console.log(req.body);
  // res.send("Hello User")

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let findUser = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (findUser) {
      return res
        .status(400)
        .json({ error: "Sorry! A user with this email already exists!" });
    }
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 2: LOGIN A USER

const loginUser = async (req, res) => {
  //If there are any errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  // console.log(email,password);

  //Check If User exists or not
  let findUser = await User.findOne({ email }); //No need to write email : email

  //If the user does not exist
  if (!findUser) {
    return res
      .status(400)
      .json({ Error: "please enter a correct credentials! " });
  }
  // In UserSchema we have defined isPasswordMatched function
  const passwordCompare = await findUser.isPasswordMatched(password);
  if (!passwordCompare) {
    return res
      .status(400)
      .json({ Error: "please enter a correct credentials! " });
  }
  //   res.json(findUser)

  const refreshToken = await generateRefreshToken(findUser?._id); //refresh token generated
  // update the refresh token
  const updateUser = await User.findByIdAndUpdate(
    findUser?._id,
    {
      refreshToken: refreshToken,
    },
    {
      new: true,
    }
  );
  // console.log(updateUser);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 3 * 60 * 60 * 1000,
  });

  res.json({
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.lastname,
    email: findUser?.email,
    mobile: findUser?.mobile,
    token: generateToken(findUser?._id),
  });
};

//ROUTE 14: ADMIN LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") res.json("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      res.json("Invalid Credentials");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 9 : Handle refresh token
const handleRefreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie?.refreshToken) {
      res.status(400).json("No refresh token in cookies!");
    }
    const refreshToken = cookie?.refreshToken;
    // console.log(refreshToken);
    const user = await User.findOne({ refreshToken });
    //  console.log(user);
    if (!user) {
      res.status(400).json("No refresh token found in db or not matched!");
    }
    //  res.json(user);
    const data = jwt.verify(refreshToken, process.env.JWT_SECRET);
    // console.log(data);
    if (user?._id != data?.id) {
      res.send("There is something wrong with refresh token!");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
//ROUTE 10: LOGOUT A USER
const logout = async (req, res) => {
  try {
    const cookie = req.cookies;
    // console.log(cookie);
    if (!cookie?.refreshToken) {
      res.status(400).json("No refresh token in cookies!");
    }
    const refreshToken = cookie?.refreshToken;
    const user = await User.findOne({ refreshToken });
    // console.log(user);
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); //Forbidden
    }
    // console.log(refreshToken);

    await User.findOneAndUpdate(
      { refreshToken },
      {
        refreshToken: "",
      }
    );
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //Forbidden
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
//ROUTE 6: UPDATE A USER
const updateUser = async (req, res) => {
  try {
    // const { id } = req.params;
    // console.log(id);

    const { _id } = req?.user;
    validateMongodbId(_id);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

// ROUTE 3: GET ALL USER DETAILS

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

// ROUTE 4: GET A SINGLE USER DETAILS
const getaUser = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    // console.log(id);
    const getUser = await User.findById(id).select("-password");
    res.json(getUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

// ROUTE 5: DELETE A USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    // console.log(id);
    const deleteUser = await User.findByIdAndDelete(id);
    res.json("User Successfully deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 7 : BLOCK A USER (ONLY ADMIN CAN DO THIS)
const blockUser = async (req, res) => {
  try {
    // console.log(req.params.id);
    const { id } = req.params;
    validateMongodbId(id);
    // console.log(id);
    const blockedUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 8 : UNBLOCK A USER (ONLY ADMIN CAN DO THIS)
const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const unblockedUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json(unblockedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 11: UPDATE PASSWORD
const updatePassword = async (req, res) => {
  try {
    const { _id } = req?.user;
    const { password } = req.body;
    validateMongodbId(_id);

    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 12: FORGOT PASSWORD
const forgotPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json("User not found with this email!");
    }

    const token = await user.createPasswordResetToken(); //This will return the token(In user model)
    await user.save(); //Used in route-13
    const resetUrl = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click here!</a>`;
    const data = {
      to: email,
      subject: "Forgot Password",
      text: "Hey User",
      htm: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 13: RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    //we need to hash the token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    //Now,we will get out user from the token , as we have saved our user in route-12
    const user = await User.findOne({
      PasswordResetToken: hashedToken,
      PasswordResetExpires: { $gt: Date.now() },
    });
    // console.log(user);
    if (!user) {
      res.json("Token expired! Please try again.");
    }
    user.password = password;
    user.PasswordResetToken = undefined; // as our password have changed now
    user.PasswordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 15: GET WISHLIST OF USER
const getWishlist = async (req, res) => {
  const { _id } = req.user;
  // console.log(_id);
  validateMongodbId(_id);
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    return res.json(findUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 16: SAVE ADDRESS OF USER
const saveAddress = async (req, res, next) => {
  const { _id } = req?.user;
  validateMongodbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 17: ADD TO CART FUNCTINALITY
const userCart = async (req, res) => {
  const { productId , color , quantity , price } = req.body;
  const { _id } = req?.user;
  validateMongodbId(_id);
  try {

    // let products = [];
    // const user = await User.findById(_id);
    // // check if user already have product in cart
    // const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    // if (alreadyExistCart) {
    //   alreadyExistCart.remove();
    // }
    // for (let i = 0; i < cart.length; i++) {
    //   let object = {};
    //   object.product = cart[i]._id;
    //   object.count = cart[i].count;
    //   object.color = cart[i].color;
    //   let getPrice = await Product.findById(cart[i]._id).select("price").exec();
    //   object.price = getPrice.price;
    //   products.push(object);
    // }
    // console.log(products);

    // let cartTotal = 0;
    // for (let i = 0; i < products.length; i++) {
    //   cartTotal = cartTotal + products[i].price * products[i].count;
    // }
    // console.log(products,cartTotal);

    let newCart = await new Cart({
    userId : _id,
      productId,
      color,
      quantity,
      price
    }).save();
    res.json(newCart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 18: GET USER'S CART
const getUserCart = async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 19: EMPTY CART
const emptyCart = async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  try {
    // const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: _id });
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 20: APPLY COUPON
const applyCoupon = async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req?.user;
  validateMongodbId(_id);
  try {
    const validCoupon = await Coupon.findOne({ name: coupon });
    // console.log(validCoupon);

    if (validCoupon == null) {
      res.json("Invalid Coupon!");
    }

    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({
      orderby: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderby: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(totalAfterDiscount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 21: CREATE ORDER
const createOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req?.user;
  validateMongodbId(_id);
  try {
    if (!COD) res.send("Create cash order failed");
    const user = await User.findOne({ _id });
    let userCart = await Cart.findOne({ orderby: user._id });

    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    // res.json(updated)
    res.json({ message: "success" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 22: GET ORDERS
const getOrders = async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

//ROUTE 23: UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getaUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
};
