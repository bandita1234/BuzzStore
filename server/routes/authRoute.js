const express = require("express");
const router = express.Router();
const { createUser , loginUser, getAllUsers, getaUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword } = require("../controllers/userCtrl");
const { body } = require("express-validator");
const {fetchUser, isAdmin} =require("../middlewires/fetchUser");

router.post(
  "/register",
  [
    //validations using "express-validator"

    // email must be an valid email
    body("email", "Enter a valid email").isEmail(),

     //mobile number must be 10 chars long
     body("mobile", "Enter a valid mobile number").isLength({ min: 10, max: 10 }),
    // password must be at least 5 chars long
    body("password", "password must be at least 5 character long").isLength({
      min: 5,
    }),
  ],
  createUser
);

router.post(
  "/login",
  [
    // email must be an valid email
    body("email", "Enter a valid email").isEmail(),
    // password can't be empty
    body("password", "password can't be blank").exists(),
  ],
  loginUser
);

router.put("/password",fetchUser,updatePassword)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.get("/getusers",getAllUsers);
router.get("/refresh",handleRefreshToken);
router.get("/logout",logout);
router.get("/",fetchUser,isAdmin,getaUser);
router.delete("/:id",deleteUser);
router.put("/update-user",fetchUser,updateUser);
router.put("/block-user/:id",fetchUser,isAdmin,blockUser);
router.put("/unblock-user/:id",fetchUser,isAdmin,unblockUser);

module.exports = router;
