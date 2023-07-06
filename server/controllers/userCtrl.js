const { generateToken } = require("../config/jwtToken");
const mongoose = require("mongoose");
const User = require("../models/User");
const { validationResult, cookie } = require("express-validator");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

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

const forgotPasswordToken = async(req,res)=>{
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      res.json("User not found with this email!")
    }

    const token = await user.createPasswordResetToken(); //This will return the token(In user model)
    await user.save();
    
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
}

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
  forgotPasswordToken
};
