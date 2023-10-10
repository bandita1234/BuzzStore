const express = require("express");
const router = express.Router();
const {
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
  updateOrderStatus,
  deleteProductFromCart,
  updateQuantity,
} = require("../controllers/userCtrl");
const { body } = require("express-validator");
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const { checkOut, paymentVerification } = require("../controllers/paymentCtrl");

router.post(
  "/register",
  [
    //validations using "express-validator"

    // email must be an valid email
    body("email", "Enter a valid email").isEmail(),

    //mobile number must be 10 chars long
    body("mobile", "Enter a valid mobile number").isLength({
      min: 10,
      max: 10,
    }),
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

router.post("/admin-login", loginAdmin);
router.post("/cart", fetchUser, userCart);
router.post("/cart/applycoupon", fetchUser, applyCoupon);

router.post("/order/checkout", fetchUser, checkOut);
router.post("/order/paymentVerification", fetchUser, paymentVerification);


router.post("/cart/createorder", fetchUser, createOrder);
router.get("/getcart", fetchUser, getUserCart);
router.put("/password", fetchUser, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
// router.put("/update-order/:id",fetchUser, isAdmin, updateOrderStatus);
router.get("/getusers", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", fetchUser, getWishlist);
// router.get("/cart/getorders",fetchUser,getOrders)
router.put("/save-address", fetchUser, saveAddress);
router.get("/:id", fetchUser, isAdmin, getaUser);
router.patch("/cart/updateQuantity", fetchUser, updateQuantity);
router.delete("/cart/delete/:cartId", fetchUser, deleteProductFromCart);
router.delete("/emptycart", fetchUser, emptyCart);
router.delete("/:id", deleteUser);
router.put("/update-user", fetchUser, updateUser);
router.put("/block-user/:id", fetchUser, isAdmin, blockUser);
router.put("/unblock-user/:id", fetchUser, isAdmin, unblockUser);

module.exports = router;
