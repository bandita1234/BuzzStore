const express = require("express");
const {
    createColor,
    updateColor,
    deleteColor,
    getColor,
    getallColor,
} = require('../controllers/colorCtrl')
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const router = express.Router();

router.post("/create", fetchUser, isAdmin, createColor);
router.put("/update/:id", fetchUser, isAdmin, updateColor);
router.delete("/delete/:id", fetchUser, isAdmin, deleteColor);
router.get("/getcolor/:id", getColor);
router.get("/getallcolors", getallColor);

module.exports = router;