const express = require("express");
const {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getallBrand,
} = require('../controllers/brandCtrl')
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const router = express.Router();

router.post("/create", fetchUser, isAdmin, createBrand);
router.put("/update/:id", fetchUser, isAdmin, updateBrand);
router.delete("/delete/:id", fetchUser, isAdmin, deleteBrand);
router.get("/getbrand/:id", getBrand);
router.get("/getallbrands", getallBrand);

module.exports = router;