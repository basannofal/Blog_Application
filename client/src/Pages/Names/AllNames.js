import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";

const AllNames = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [NameCategory, setNameCategory] = useState([]);
  const [names, setNames] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalNames, setTotalNames] = useState(0);


  const getNames = async () => {
    try {
      const res = await axios.get('/getnames');
      setNames(res.data)
      setTotalNames(res.data.length);
    } catch (err) {
      console.log(err);
    }
  }


  const getData = async () => {
    try {
      const res = await axios.get(`/getnamescategory`);
      setNameCategory(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getNames();
    getData();
  }, []);

  const trashNames = async (id) => {
    try {
      const res = await axios.patch(`/trashnames/${id}`);
      getNames();
    } catch (error) {
      window.alert(error);
    }
  };

  const [filterNames, setfilterNames] = useState(names);
  const filterBlogPosts = () => {
    const searchTerm = searchFilter.toLowerCase();
    const filterednames = names.filter((item) => {
      const name1 = item.name_lang1.toLowerCase().includes(searchTerm);
      const name2 = item.name_lang2.toLowerCase().startsWith(searchTerm);
      const nameMeaning = item.name_meaning.toLowerCase().startsWith(searchTerm);
      const nameGender = item.name_gender.toLowerCase().startsWith(searchTerm);

      // Apply category filter
      const categoryMatches = categoryFilter === "" || item.name_category == categoryFilter;

      return (name1 || name2 || nameMeaning || nameGender) && categoryMatches;
    });
    setfilterNames(filterednames);
  };

  useEffect(() => {
    filterBlogPosts();
  }, [searchFilter, categoryFilter, names]);


  const itemPerPage = 10;

  const numberOfPage = Math.ceil(filterNames.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = filterNames.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );

  return (
    <>
      <div class="container-scroller">
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
                        to={`/addnames`}
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
                          New Name
                        </button>
                      </NavLink>
                    </div>
                  </div>

                  <div class="activity">

                    <p class="mb-3" style={{ fontSize: 20, fontWeight: "bold" }}>All Names </p>

                    <div className="d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>

                      <div className="d-flex" style={{ fontSize: "14px" }}>
                        <NavLink className='text-decoration-none text-dark' onClick={getNames}><p>All ({totalNames})</p></NavLink>
                        <p className="mx-2">|</p>
                        <NavLink to={'/alltrashnames'} className='text-decoration-none'><p className="text-danger">Trash</p></NavLink>
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
                          {NameCategory.map((category) => (
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
                          <th scope="col">Name</th>
                          <th scope="col">Name</th>
                          <th scope="col">Meaning</th>
                          <th scope="col">Descripiton</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Category</th>
                          <th scope="col">Date & Time</th>
                          <th scope="col">Priority</th>
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
                                    <td style={{ width: "15%" }}>
                                      {e.name_lang1}
                                      <p className="p-0 m-0 tred " style={{ fontSize: '14px' }}>
                                        <div className="d-flex">
                                          <Link to={`/editnames`} state={{ id: e.id, content: e.blog_content }} className='text-decoration-none'><p className="p-0 m-0">&nbsp;Edit | </p></Link>
                                          <p className="text-danger p-0 m-0" onClick={() => { trashNames(e.id) }}>&nbsp;Trash</p>
                                        </div>
                                      </p>
                                    </td>
                                    <td> {e.name_lang2}</td>
                                    <td>{e.name_meaning}</td>
                                    <td>{e.name_description}</td>
                                    <td>{e.name_gender}</td>


                                    <td>
                                      {NameCategory.map((x) => {
                                        if (e.name_category === x.id) {
                                          flag = 1;
                                          return x.category_name;
                                        }
                                      })}
                                      {flag === 0 ? "null" : ""}
                                    </td>
                                    <td>
                                      <p className="m-0 p-0"> {e.upload_date}</p>
                                      <p className="m-0 p-0"> {e.upload_time}</p>

                                    </td>
                                    <td>{e.name_priority}</td>

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

export default AllNames