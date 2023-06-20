const User = require("../models/User");
const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  // console.log(req?.header("authToken"));

  //Get the user from the jwt token and add id to req object

  const token = req?.header("authToken"); //get the token(name-"auth-token") from the header
  if (!token) {
    res.status(401).send({ Error: "Please login to continue!" });
  }

  try {
    //If present,verify the token with the secret
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data);
    const user = await User.findById(data?.id);
    // console.log(user);
    req.user = user; //Got the user!
    next();
  } catch (error) {
    res.status(401).send({ Error: "Please login to continue!" });
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  // console.log(adminUser);
  if (adminUser.role !== "admin") {
    res.send({ Error: "You are not the admin!" });
  }else{
    next();
  }
};

module.exports = { fetchUser, isAdmin };
