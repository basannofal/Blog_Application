const conn = require('../../db/conn')


const getBlogPosts = async (req, res) => {
    const q =
        "SELECT *, DATE_FORMAT(DATE(blog_publish_date), '%d-%m-%Y') AS blog_publish_date, TIME_FORMAT(blog_time, '%r') AS blog_time FROM bg_blog_post";

    const flag = true;

    conn.query(q, [flag], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
}

const getBlogActivity = async (req, res) => {
    const q = "SELECT *, DATE_FORMAT(DATE(blog_publish_date), '%b %D') AS blog_publish_date, TIME_FORMAT(blog_time, '%h:%i %p') AS blog_time FROM bg_blog_post WHERE blog_status = ? order by id desc limit 5";

    const flag = true;

    conn.query(q, [flag], (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}


module.exports = { getBlogPosts, getBlogActivity }