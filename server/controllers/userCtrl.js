const { generateToken } = require("../config/jwtToken");
const mongoose = require("mongoose");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { validateMongodbId } = require("../utils/validateMongodbId");
// const { generateRefreshToken } = require("../config/refreshToken");

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

  // const refreshToken = await generateRefreshToken(findUser?._id); //refresh token generated
  //update the refresh token
  // const updateUser = await User.findByIdAndUpdate(
  //   findUser?._id,
  //   {
  //     refreshToken: refreshToken,
  //   },
  //   {
  //     new: true,
  //   }
  // );
  // console.log(updateUser);

  res.json({
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.lastname,
    email: findUser?.email,
    mobile: findUser?.mobile,
    token: generateToken(findUser?._id),
  });
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
    const { id } = req?.user;
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

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getaUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
};
