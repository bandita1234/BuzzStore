const express = require("express");
const { createProduct, getaproduct, getallproducts, updateproduct, deleteproduct, addToWishlist, rating, uploadImages, deleteImages } = require("../controllers/productCtrl");
const router = express.Router();
const {fetchUser,isAdmin} = require('../middlewires/fetchUser');
const { uploadPhoto, productImgResize } = require("../middlewires/uploadImages");

router.post('/create',fetchUser, isAdmin,createProduct);
router.put('/upload',fetchUser,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages)
router.get('/:id',getaproduct);
router.get('/',getallproducts);
router.put('/wishlist',fetchUser,addToWishlist);
router.put('/rating',fetchUser,rating)
router.put('/:id',fetchUser, isAdmin,updateproduct);
router.delete('/:id',fetchUser, isAdmin,deleteproduct);
router.delete('/delete-img/:id',fetchUser, isAdmin,deleteImages);

module.exports = router;