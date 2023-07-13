const Color = require("../models/Color");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createColor = async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const updateColor = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const deleteColor = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.json(deletedColor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getColor = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaColor = await Color.findById(id);
    res.json(getaColor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getallColor = async (req, res) => {
  try {
    const getallColor = await Color.find();
    res.json(getallColor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
};