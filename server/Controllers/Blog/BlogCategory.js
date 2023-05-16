const conn = require('../../db/conn')

const addBlogCategory = async (req, res) => {
    const values = [
        req.body.categoryName,
        req.body.categoryDesc,
        req.body.subCategory,
    ];

    const q = "INSERT INTO `bg_blog_category`(`category_name`, `category_description`, `sub_category`) VALUES (?)";

    conn.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const getBlogCategory = async (req, res) => {
    const q = "select * from bg_blog_category";

    conn.query(q, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

const deleteBlogCategory = async (req, res) => {
    const id = req.params.id;

    const q = "delete from bg_blog_category where id = ?";

    conn.query(q, id, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}

module.exports = { addBlogCategory, getBlogCategory, deleteBlogCategory }