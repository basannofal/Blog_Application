const express = require('express');
const router = express.Router();
const multer = require("multer");


const Books = require('../../Controllers/Books/Books');


var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads/Books/PDF");
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === "bookpdf") { // if uploading resume
        if ( file.mimetype === 'application/pdf') { 
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'), false);
        }
    } else { 
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only PNG, JPG, JPEG files are allowed.'), false); 
        }
    }
}

var uploads = multer({
    storage: imgconfig,
    fileFilter : fileFilter
});


router.post("/addbook", uploads.fields([{ name: 'bookthumnail', maxCount: 1 }, { name: 'bookpdf', maxCount: 1 }]), Books.addBooks)
router.route("/getbooks").get(Books.getbooks);
router.route("/gettrashbooks").get(Books.gettrashbooks);
router.route("/getbookdetail/:id").get(Books.getbookdetail);
router.route("/trashbook/:id").patch(Books.trashbooks);
router.route("/trashbackbook/:id").patch(Books.getbacktrashbooks);
router.route("/deletebook/:id").delete(Books.deletebook);
router.patch("/editbook/:id", uploads.fields([{ name: 'bookthumnail', maxCount: 1 }, { name: 'bookpdf', maxCount: 1 }]), Books.EditBooks)


module.exports = router;