const express = require('express');
const router = express.Router();

const Book = require('../../Controllers/Books/BookCategory');

router.route("/addbookcategory").post(Book.addBookCategory);
router.route("/getbookcategory").get(Book.getBookCategory);
router.route("/deletebookcategory/:id").delete(Book.deleteBookCategory);

module.exports = router;