const express = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
} = require("../controllers/couponCtrl");
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const router = express.Router();

router.post("/create", fetchUser, isAdmin, createCoupon);
router.get("/getallcoupons", fetchUser, isAdmin, getAllCoupons);
router.get("/getcoupon/:id", fetchUser, isAdmin, getCoupon);
router.put("/update/:id", fetchUser, isAdmin, updateCoupon);
router.delete("/delete/:id", fetchUser, isAdmin, deleteCoupon);

module.exports = router;