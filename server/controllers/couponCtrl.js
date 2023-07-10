const Coupon = require("../models/Coupon");
const { validateMongodbId } = require("../utils/validateMongodbId");
const asynHandler = require("express-async-handler");

const createCoupon = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
});
const getAllCoupons = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
});
const updateCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
});
const deleteCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
});
const getCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getAcoupon = await Coupon.findById(id);
    res.json(getAcoupon);
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
});
module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCoupon,
};