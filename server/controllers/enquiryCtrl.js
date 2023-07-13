const Enquiry = require("../models/Enquiry");
const { validateMongodbId } = require("../utils/validateMongodbId");

const createEnquiry = async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const updateEnquiry = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const deleteEnquiry = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getEnquiry = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
const getallEnquiry = async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find();
    res.json(getallEnquiry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
};
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};