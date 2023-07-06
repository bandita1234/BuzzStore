const express = require("express");
const { createProduct, getaproduct, getallproducts, updateproduct, deleteproduct } = require("../controllers/productCtrl");
const router = express.Router();
const {fetchUser,isAdmin} = require('../middlewires/fetchUser');

router.post('/create',fetchUser, isAdmin,createProduct);
router.get('/:id',getaproduct);
router.get('/',getallproducts);
router.put('/:id',fetchUser, isAdmin,updateproduct);
router.delete('/:id',fetchUser, isAdmin,deleteproduct);

module.exports = router;