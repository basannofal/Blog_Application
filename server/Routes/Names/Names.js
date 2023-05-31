const express = require('express');
const router = express.Router();

const Names = require('../../Controllers/Names/Names');


router.route("/addnamepost").post(Names.addnames);
router.route("/getnames").get(Names.getnames);
router.route("/gettrashnames").get(Names.gettrashnames);
router.route("/getnamedetail/:id").get(Names.getnamesdetail);
router.route("/trashnames/:id").patch(Names.trashnames);
router.route("/trashbacknames/:id").patch(Names.getbacktrashnames);
router.route("/deletename/:id").delete(Names.deletenames);
router.route("/editname/:id").patch(Names.Editname);



module.exports = router;