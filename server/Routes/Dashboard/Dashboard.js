const express = require('express');
const router = express.Router();

const Dashboard = require('../../Controllers/Dashboard/Dashboard');

router.route("/getblogposts").get(Dashboard.getBlogPosts);
router.route("/getblogactivity").get(Dashboard.getBlogActivity);

module.exports = router;