import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllTrashBooks = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [BookCategory, setBookCategory] = useState([]);
  const [Books, setBooks] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [TotalBooks, setTotalBooks] = useState(0);


  const getBooks = async () => {
    try {
      const res = await axios.get('/gettrashbooks');
      setBooks(res.data)
      setTotalBooks(res.data.length);
    } catch (err) {
      console.log(err);
    }
  }


  const getData = async () => {
    try {
      const res = await axios.get(`/getbookcategory`);
      setBookCategory(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getBooks();
    getData();
  }, []);


  const [filterBooks, setfilterBooks] = useState(Books);
  const filterBook = () => {
    const searchTerm = searchFilter.toLowerCase();
    const filteredBooks = Books.filter((item) => {
      const title = item.book_title.toLowerCase().includes(searchTerm);
      const author = item.book_author.toLowerCase().startsWith(searchTerm);
      const bookdesc = item.book_description.toLowerCase().startsWith(searchTerm);

      // Apply category filter
      const categoryMatches = categoryFilter === "" || item.books_category == categoryFilter;

      return (title || author || bookdesc) && categoryMatches;
    });
    setfilterBooks(filteredBooks);
  };

  useEffect(() => {
    filterBook();
  }, [searchFilter, categoryFilter, Books]);


  const itemPerPage = 10;

  const numberOfPage = Math.ceil(filterBooks.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = filterBooks.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );



  const trashBackBook = async (id) => {
    try {
      const res = await axios.patch(`/trashbackbook/${id}`);
      getBooks();
    } catch (error) {
      window.alert(error);
    }
  };

  const DeleteBook = async (id) => {
    try {
      const res = await axios.delete(`/deletebook/${id}`);
      toast.success("Book Delete Successfully");
      getBooks();
    } catch (error) {
      window.alert(error);
    }
  }



  const DeleteAlert = async (id) => {
    let title;
    try {
      const res = await axios.get(`/getbookdetail/${id}`);
      title = res.data[0].book_title;
    } catch (error) {
      window.alert(error);
    }
    let x = window.prompt(`Enter Title Name = ${title} `, '');
    if (x == title) {
      DeleteBook(id);
    } else {
      window.alert("Oops ! Title is Incorrect")
    }
  }





  return (
    <>
      <div class="container-scroller">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a class="navbar-brand brand-logo" href="">
              Blog App
            </a>
            <a class="navbar-brand brand-logo-mini" href="">
              Blog
            </a>
          </div>

          <div class="navbar-menu-wrapper d-flex">
            <button
              class="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
            >
              <span class="mdi mdi-menu"></span>
            </button>

            <div class="search-field d-none d-xl-block">
              <form class="d-flex align-items-center h-100" action="#">
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <i class="input-group-text border-0 mdi mdi-magnify"></i>
                  </div>
                  <input
                    type="text"
                    class="form-control bg-transparent border-0"
                    placeholder="Search Blog Post"
                    value={searchFilter}
                    onChange={(e) => {
                      setSearchFilter(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </nav>

        <div class="container-fluid page-body-wrapper">
          <Sidebars />
          <div class="main-panel">
            <div class="content-wrapper">
              <section>
                <div class="dash-content">
                  <div class="overview">
                    <div
                      class="title"
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      <NavLink
                        to={`/addbook`}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          className="btn btn-primary d-flex "
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <i
                            class="uil uil-plus mr-2"
                            style={{ backgroundColor: "#007bff" }}
                          ></i>
                          New Book
                        </button>
                      </NavLink>
                    </div>
                  </div>

                  <div class="activity">

                    <p class="mb-3" style={{ fontSize: 20, fontWeight: "bold" }}>All Books </p>

                    <div className="d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>

                      <div className="d-flex" style={{ fontSize: "14px" }}>
                        <NavLink to={'/allbooks'} className='text-decoration-none'><p className="text-primary"> <i class="bi bi-arrow-left"></i> &nbsp; Back</p></NavLink>
                        <p className="mx-2">|</p>
                        <p className="text-danger" >Trash </p>
                      </div>

                      <div class="group">
                        <label className="mr-2" style={{ fontSize: "14px" }}><b>Category :</b></label>
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          style={{
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            outline: '0',
                            fontSize: '14px',
                            width: '10rem',
                            backgroundColor: 'transparent'
                          }}
                        >
                          <option value=''>All categories</option>
                          {BookCategory.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>

                    <table class="table table-striped" style={{ border: "1px solid #C3C4C7", backgroundColor: "#fff" }}>
                      <thead>
                        <tr>
                          <th scope="col">Thumnail</th>
                          <th scope="col">PDF</th>
                          <th scope="col">Title</th>
                          <th scope="col">Author</th>
                          <th scope="col">Description</th>
                          <th scope="col">Download</th>
                          <th scope="col">Category</th>
                          <th scope="col">Date & Time</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: '15px' }}>
                        {rows.length > 0
                          ? rows

                            .map((e, idx) => {
                              let flag = 0;


                              return (
                                <>
                                  <tr className="blog-title">
                                    <td>
                                      {
                                        e.book_thumbnail != '' ?
                                          <img src={(`./uploads/Books/PDF/${e.book_thumbnail}`)} style={{ height: "50px", width: "50px" }} />
                                          : <p>Not Found</p>
                                      }
                                    </td>
                                    <td>
                                      {
                                        e.book_pdf != '' ?
                                          <img src={require(`../../Assets/Images/pdf.png`)} style={{ height: "50px", width: "50px" }} />
                                          : <p>Not Found</p>
                                      }
                                    </td>
                                    <td style={{ width: "15%" }}>
                                      {e.book_title}
                                      <p className="p-0 m-0 tred " style={{ fontSize: '14px' }}>
                                        <div className="d-flex">

                                          <p className=" p-0 m-0" onClick={() => { trashBackBook(e.id) }}> Restore</p>
                                          <p className="mx-1 m-0 p-0">|</p>
                                          <p className="p-0 m-0 text-danger" onClick={() => { DeleteAlert(e.id) }}>Permenently Delete </p>
                                        </div>
                                      </p>
                                    </td>
                                    <td> {e.book_author}</td>
                                    <td>{e.book_description}</td>
                                    <td>{e.book_isdownload == 0 ? <p>No</p> : <p>Yes</p>}</td>


                                    <td>
                                      {BookCategory.map((x) => {
                                        if (e.books_category === x.id) {
                                          flag = 1;
                                          return x.category_name;
                                        }
                                      })}
                                      {flag === 0 ? "null" : ""}
                                    </td>
                                    <td>
                                      <p className="m-0 p-0"> {e.upload_date}</p>
                                      <p className="m-0 p-0"> {e.book_publish_time}</p>

                                    </td>

                                  </tr >
                                </>
                              );
                            })
                          : ""}
                      </tbody>

                    </table>
                  </div>
                  <div
                    className="pagination"
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      marginRight: "2rem",
                    }}
                  >
                    <button
                      disabled={currentPage < 1}
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &lt;
                    </button>
                    {pageIndex
                      .slice(
                        Math.max(0, currentPage - 2),
                        Math.min(numberOfPage, currentPage + 3)
                      )
                      .map((page) => {
                        return (
                          <>
                            <button
                              key={page}
                              onClick={() => handlePageChange(page - 1)}
                              className={
                                page === currentPage + 1
                                  ? "active page-link bg-primary text-white"
                                  : "page-link"
                              }
                            >
                              {page}
                            </button>
                          </>
                        );
                      })}
                    <button
                      disabled={currentPage >= numberOfPage - 1}
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div >
      </div >
    </>
  );
}

export default AllTrashBooks