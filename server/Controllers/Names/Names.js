const conn = require('../../db/conn')

// **************** Add Blog Post *******************

const addnames = async (req, res) => {
    const {
        nameLang1,
        nameDesc,
        nameLang2,
        nameMeaning,
        nameGender,
        nameCategory,
        namePriority
    } = req.body;


    let currentDate = new Date().toJSON().slice(0, 10);
    let currentTime = new Date().toJSON().slice(11, 19);

    console.log(req.body);

    const values = [
        nameLang1,
        nameDesc,
        nameLang2,
        nameMeaning,
        nameGender,
        nameCategory,
        currentDate,
        currentTime,
        namePriority
    ];

    const q = "INSERT INTO `bg_name_detail`(`name_lang1`, `name_description`, `name_lang2`, `name_meaning`, `name_gender`, `name_category`, `upload_date`, `upload_time`, `name_priority` ) VALUES (?)";

    conn.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}



// get names


const getnames = async (req, res) => {
    const q = "select *, DATE_FORMAT(DATE(upload_date), '%Y-%m-%d') AS upload_date FROM `bg_name_detail` where  name_status = ? order by id desc ";

    const flag = true;
    conn.query(q, [flag], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
            console.log(data);
        }
    })
}



// ********* Move On Trash ******

const trashnames = async (req, res) => {
    const q = "UPDATE `bg_name_detail` SET `name_status`= ? WHERE id = ?";
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
}




// ********* Get back from trash NAmes ******

const getbacktrashnames = async (req, res) => {
    const q = "UPDATE `bg_name_detail` SET `name_status`= ? WHERE id = ?";
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
}



// ********* Delete names ******

const deletenames = async (req, res) => {

    const q = "DELETE FROM `bg_name_detail` WHERE id = ?";
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
}





// ********* Get Blog Post detail ******

const getnamesdetail = async (req, res) => {

    const q = "SELECT *, DATE_FORMAT(DATE(upload_date), '%Y-%m-%d') AS upload_date FROM `bg_name_detail` WHERE id = ?";
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
}


// ************ Get Trash names **********************

const gettrashnames = async (req, res) => {

    const q =
        "SELECT *, DATE_FORMAT(DATE(upload_date), '%Y-%m-%d') AS upload_date FROM `bg_name_detail` where  name_status 	= ? order by id desc ";

    const flag = false;

    conn.query(q, [flag], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
};






// ****************** Edit NAmes ********************

const Editname = async (req, res) => {

    let currentDate = new Date().toJSON().slice(0, 10);
    let currentTime = new Date().toJSON().slice(11, 19);

    const q = "UPDATE `bg_name_detail` SET `name_lang1`=?, `name_description`= ?, `name_lang2`= ?, `name_meaning`= ?, `name_gender`= ?, `name_category`= ?, `upload_date`= ?, `upload_time`= ?, `name_priority`= ?  WHERE id = ?";


    const id = req.params.id;
    const values = [
        req.body.nameLang1,
        req.body.nameDesc,
        req.body.nameLang2,
        req.body.nameMeaning,
        req.body.nameGender,
        req.body.nameCategory,
        currentDate,
        currentTime,
        req.body.namePriority,
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
};





module.exports = { addnames, getnames, trashnames, getbacktrashnames, deletenames, getnamesdetail, gettrashnames, Editname }