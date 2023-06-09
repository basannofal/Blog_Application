const express = require('express');
const router = express.Router();
const conn = require('../../db/conn')
const multer = require("multer");
const Names = require('../../Controllers/Names/Names');




var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads/Books/Thumnail");
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});


var uploads = multer({
    storage: imgconfig,
});



router.route("/addnamepost").post(Names.addnames);
router.route("/getnames").get(Names.getnames);
router.route("/gettrashnames").get(Names.gettrashnames);
router.route("/getnamedetail/:id").get(Names.getnamesdetail);
router.route("/trashnames/:id").patch(Names.trashnames);
router.route("/trashbacknames/:id").patch(Names.getbacktrashnames);
router.route("/deletename/:id").delete(Names.deletenames);
router.route("/editname/:id").patch(Names.Editname);


router.post("/saveimg", uploads.single("image"), (req,res) => {
    const  imageData = req.file.filename 
    // Insert the image data into the database
    const query = 'INSERT INTO bg_img_api (`img`) VALUES (?)';
    conn.query(query, [imageData], (error, results) => {
      if (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ error: 'Failed to save image' });
      } else {
        console.log(results);
        const imageLink = `http://localhost:3000/uploads/Books/Thumnail/${imageData}`;
        res.json({ imageLink });
      }
    });
})


module.exports = router;