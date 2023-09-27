const express = require("express");
const {
    createEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getEnquiry,
    getallEnquiry,
} = require('../controllers/enquiryCtrl')
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const router = express.Router();

router.post("/create", createEnquiry);
router.put("/update/:id", fetchUser, isAdmin, updateEnquiry);
router.delete("/delete/:id", fetchUser, isAdmin, deleteEnquiry);
router.get("/getEnquiry/:id", getEnquiry);
router.get("/getallEnquiry", getallEnquiry);

module.exports = router;