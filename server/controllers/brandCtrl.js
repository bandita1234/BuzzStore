const Brand = require("../models/Brand");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const updateBrand = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const deleteBrand = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getBrand = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getallBrand = async (req, res) => {
  try {
    const getallBrand = await Brand.find();
    res.json(getallBrand);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
};