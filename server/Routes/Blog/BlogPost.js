// const express = require("express");
// const router = express.Router();
// const blogPost = require('../../Controllers/Blog/BlogPost');


// const multer = require('multer');

// var imgconfig = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../client/public/uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `image-${Date.now()}.${file.originalname}`);
//     },
// });

// var upload = multer({
//     storage: imgconfig,
// });


// router.route("/addblogpost", upload.single('blog_image')).post(blogPost.addBlogPost);
// router.route("/getblogposts").get(blogPost.getBlogPost);

// module.exports = router;