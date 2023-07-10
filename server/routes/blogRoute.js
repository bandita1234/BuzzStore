const express = require("express");
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, blogLike, blogdislike, uploadImages } = require("../controllers/blogCtrl");
const { fetchUser, isAdmin } = require("../middlewires/fetchUser");
const { blogImgResize, uploadPhoto } = require("../middlewires/uploadImages");
const router = express.Router();

router.post('/create',fetchUser, isAdmin,createBlog);
router.put('/upload/:id',fetchUser,isAdmin,uploadPhoto.array('images',10),blogImgResize,uploadImages)
router.put('/update/:id',fetchUser, isAdmin,updateBlog);
router.get('/getblog/:id',getBlog);
router.get('/getblogs',getAllBlogs);
router.delete('/deleteblog/:id',deleteBlog);
router.put('/likes',fetchUser,blogLike);
router.put('/dislikes',fetchUser,blogdislike)


module.exports = router;