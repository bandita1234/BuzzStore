const Category = require("../models/ProdCategory");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createCategory =async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const updateCategory =async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const deleteCategory =async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getCategory = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getallCategory = async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};