const express = require('express');
const router = express.Router();

const NamesCategory = require('../../Controllers/Names/NamesCategory');

router.route("/getnamescategory").get(NamesCategory.getnamesCategory);
router.route("/addnamescategory").post(NamesCategory.addnamesCategory);
router.route("/deletenamescategory/:id").delete(NamesCategory.deletenamesCategory);

module.exports = router;