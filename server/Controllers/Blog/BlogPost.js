const conn = require("../../db/conn");
const express = require("express");
const router = express.Router();
const multer = require("multer");

var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads/Blog"); // store the image in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

var upload = multer({
  storage: imgconfig,
});

router.post("/addblogpost", upload.single("blogImage"), (req, res) => {
  console.log("***** Reached *****");

  console.log(req.body);
  console.log(req.file.filename);

  const blogImage = req.file.filename;

  const {
    blogTitle,
    blogDesc,
    blogContent,
    blogAuthor,
    blogPublishDate,
    blogCategory,
    blogKeywords,
    blogTags,
  } = req.body;

  conn.query(
    "INSERT INTO bg_blog_post SET ? ",
    {
      blog_title: blogTitle,
      blog_description: blogDesc,
      blog_content: blogContent,
      blog_author: blogAuthor,
      blog_publish_date: blogPublishDate,
      blog_image: blogImage,
      blog_category: blogCategory,
      blog_keywords: blogKeywords,
      blog_tags: blogTags,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log("Post Inserted !");
      }
    }
  );

  // *****$$$$@@%%%%******* here Second Example is : *****$$$$@@%%%%*******  //

  // ##### To Get Values from client side through req.body or req.file  ######## //

  // const blog_image = req.file.filename;

  // const {
  //     blog_title,
  //     blog_description,
  //     blog_content,
  //     blog_author,
  //     blog_publish_date,
  //     blog_category,
  //     blog_keywords,
  //     blog_tags,
  // } = req.body;

  // ###### Here Query and Connection sql  ######### //

  // const q = "insert into bg_blog_post (`blog_title`, `blog_description`, `blog_content`, `blog_author`, `blog_publish_date`, `blog_image`, `blog_category`, `blog_keywords`, `blog_tags`) values ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";

  // conn.query(q, [blog_title, blog_description, blog_content, blog_author, blog_publish_date, blog_image, blog_category, blog_keywords, blog_tags], (err, data) => {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         res.send(data);
  //         console.log(data);
  //         console.log("Data Added");
  //     }
  // })

  // ####### here this code is write inside insert query  ######## //

  // blog_title: blog_title,
  // blog_description: blog_description,
  // blog_content: blog_content,
  // blog_author: blog_author,
  // blog_publish_date: blog_publish_date,
  // blog_image: blog_image,
  // blog_category: blog_category,
  // blog_keywords: blog_keywords,
  // blog_tags: blog_tags,
});

module.exports = router;
