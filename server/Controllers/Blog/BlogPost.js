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

// **************** Add Blog Post *******************

router.post("/addblogpost", upload.single("blogImage"), (req, res) => {


  const blogImage = '';
  if (req.file == undefined) {

  } else {
    blogImage = req.file.filename;
  }
  console.log(blogImage);

  const {
    blogTitle,
    blogDesc,
    blogContent,
    blogAuthor,
    blogPublishDate,
    blogCategory,
    blogKeywords,
    blogTags,
    blogStatus,
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
      blog_status: blogStatus,
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

});

// ************ Get Blog Post **********************

router.get("/getblogposts", (req, res) => {
  console.log("****** Reached *******");

  const q =
    "SELECT *, DATE_FORMAT(DATE(blog_publish_date), '%d-%m-%Y') AS blog_publish_date, TIME_FORMAT(blog_time, '%r') AS blog_time FROM bg_blog_post where  blog_delete_status 	= ? order by id desc ";

  const flag = true;

  conn.query(q, [flag], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});



// ************ Get Blog Post **********************

router.get("/gettrashblogpost", (req, res) => {
  console.log("****** Reached *******");

  const q =
    "SELECT *, DATE_FORMAT(DATE(blog_publish_date), '%d-%m-%Y') AS blog_publish_date FROM bg_blog_post where  blog_delete_status 	= ? order by id desc ";

  const flag = false;

  conn.query(q, [flag], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});


// ********* Move On Blog Post ******

router.patch("/trashblogpost/:id", (req, res) => {
  const q = "UPDATE `bg_blog_post` SET `blog_delete_status`= ? WHERE id = ?";
  const values = [
    false,
    req.params.id
  ]
  conn.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
})


// ********* Get back from trash Blog Post ******

router.patch("/trashbackblogpost/:id", (req, res) => {
  const q = "UPDATE `bg_blog_post` SET `blog_delete_status`= ? WHERE id = ?";
  const values = [
    true,
    req.params.id
  ]
  conn.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
})





// ********* Delete Blog Post ******

router.delete("/deletepost/:id", (req, res) => {

  const q = "DELETE FROM `bg_blog_post` WHERE id = ?";
  const values = [
    req.params.id
  ]
  conn.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
})




// ********* Get Blog Post detail ******

router.get("/getblogpostdetail/:id", (req, res) => {

  const q = "SELECT *, DATE_FORMAT(DATE(blog_publish_date), '%Y-%m-%d') AS blog_publish_date FROM `bg_blog_post` WHERE id = ?";
  const values = [
    req.params.id
  ]
  conn.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
})



// ************** update Blog Post *****************

router.patch("/editblogpost/:id", upload.single("blogImage"), (req, res) => {


  let blogImage = '';

  if (req.file == undefined) {
    blogImage = req.body.blogImage
  } else {
    blogImage = req.file.filename;
  }


  const {
    blogTitle,
    blogDesc,
    blogContent,
    blogAuthor,
    blogPublishDate,
    blogCategory,
    blogKeywords,
    blogTags,
    blogStatus,
  } = req.body;



  const q = "UPDATE `bg_blog_post` SET `blog_title`= ?, `blog_description`= ?, `blog_content`= ?, `blog_author`= ?, `blog_publish_date`= ?, `blog_image`= ?, `blog_category`= ?, `blog_status`= ?, `blog_keywords`= ?, `blog_tags`= ? WHERE id = ?";


  const id = req.params.id;
  const values = [
    blogTitle,
    blogDesc,
    blogContent,
    blogAuthor,
    blogPublishDate,
    blogImage,
    blogCategory,
    blogStatus,
    blogKeywords,
    blogTags,
    id
  ]

  console.log(values);


  conn.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err)
    };
    return res.json(data);
  });

});




module.exports = router;
