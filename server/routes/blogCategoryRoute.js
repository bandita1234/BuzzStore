const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controllers/blogCategoryCtrl");
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const router = express.Router();

router.post("/create", fetchUser, isAdmin, createCategory);
router.put("/update/:id", fetchUser, isAdmin, updateCategory);
router.delete("/delete/:id", fetchUser, isAdmin, deleteCategory);
router.get("/getcategory/:id", getCategory);
router.get("/getallcategory", getallCategory);


module.exports = router;