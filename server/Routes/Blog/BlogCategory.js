const express = require('express');
const router = express.Router();

const Blog = require('../../Controllers/Blog/BlogCategory');

router.route("/addblogcategory").post(Blog.addBlogCategory);
router.route("/getblogcategory").get(Blog.getBlogCategory);
router.route("/deleteblogcategory/:id").delete(Blog.deleteBlogCategory);

module.exports = router;