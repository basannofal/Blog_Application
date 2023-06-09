
const conn = require('../../db/conn')


///*******************ADD PRODUCT ************************** */
const addBooks = async (req, res) => {

    try {
        const { bookTitle, bookAuthor, bookDesc, bookIsDownloadable, bookCategory } = req.body;

        var ThumnailImg = '';
        if (req.files.bookthumnail != undefined) {
            ThumnailImg = req.files.bookthumnail[0].filename
        }

        var PdfImg = '';
        if (req.files.bookpdf != undefined) {
            PdfImg = req.files.bookpdf[0].filename
        }


        let currentDate = new Date().toJSON().slice(0, 10);
        let currentTime = new Date().toJSON().slice(11, 19);


        const q = "INSERT INTO `bg_books_detail`( `book_title`, `book_author`, `book_publish_date`, `book_publish_time`, `book_description`, `book_thumbnail`, `book_pdf`,  `book_isdownload`, `books_category`) VALUES (?,?,?,?,?,?,?,?,?) "

        const data = [
            bookTitle,
            bookAuthor,
            currentDate,
            currentTime,
            bookDesc,
            ThumnailImg,
            PdfImg,
            bookIsDownloadable,
            bookCategory
        ]

        conn.query(q, data, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err)
            } else {
                res.send(data);
            }
        });

    } catch (error) {
        console.log(error);
    }
}




// get Books


const getbooks = async (req, res) => {
    const q = "select *, DATE_FORMAT(DATE(book_publish_date), '%Y-%m-%d') AS upload_date FROM `bg_books_detail` where  book_status = ? order by id desc ";

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

const trashbooks = async (req, res) => {
    const q = "UPDATE `bg_books_detail` SET `book_status`= ? WHERE id = ?";
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




// ********* Get back from trash Books ******

const getbacktrashbooks = async (req, res) => {
    const q = "UPDATE `bg_books_detail` SET `book_status`= ? WHERE id = ?";
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



// ********* Delete Book ******

const deletebook = async (req, res) => {

    const q = "DELETE FROM `bg_books_detail` WHERE id = ?";
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





// ********* Get Book detail ******

const getbookdetail = async (req, res) => {

    const q = "SELECT *, DATE_FORMAT(DATE(book_publish_date), '%Y-%m-%d') AS upload_date FROM `bg_books_detail` WHERE id = ?";
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


// ************ Get Trash Books **********************

const gettrashbooks = async (req, res) => {

    const q =
        "SELECT *, DATE_FORMAT(DATE(book_publish_date), '%Y-%m-%d') AS upload_date FROM `bg_books_detail` where book_status 	= ? order by id desc ";

    const flag = false;

    conn.query(q, [flag], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
};







///*******************Edit Books ************************** */
const EditBooks = async (req, res) => {

    try {
        const { bookTitle, bookAuthor, bookDesc, bookIsDownloadable, bookCategory } = req.body;

        var ThumnailImg = '';
        if (req.files.bookthumnail != undefined) {
            ThumnailImg = req.files.bookthumnail[0].filename
        } else {
            ThumnailImg = req.body.bookthumnail
        }

        var PdfImg = '';
        if (req.files.bookpdf != undefined) {
            PdfImg = req.files.bookpdf[0].filename
        } else {
            PdfImg = req.body.bookpdf
        }


        let currentDate = new Date().toJSON().slice(0, 10);
        let currentTime = new Date().toJSON().slice(11, 19);


        const q = "UPDATE `bg_books_detail` SET  `book_title`=?, `book_author`=?, `book_publish_date`=?, `book_publish_time`=?, `book_description`=?, `book_thumbnail`=?, `book_pdf`=?, `book_isdownload`=?, `books_category`=?  WHERE id = ?"

        const id = req.params.id;

        const data = [
            bookTitle,
            bookAuthor,
            currentDate,
            currentTime,
            bookDesc,
            ThumnailImg,
            PdfImg,
            bookIsDownloadable,
            bookCategory,
            id
        ]

        conn.query(q, data, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err)
            } else {
                res.send(data);
            }
        });

    } catch (error) {
        console.log(error);
    }
}







module.exports = { addBooks, getbooks, trashbooks, getbacktrashbooks, deletebook, getbookdetail, gettrashbooks, EditBooks }

