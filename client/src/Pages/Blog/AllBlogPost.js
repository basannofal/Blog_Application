import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";

const AllBlogPost = () => {
  const [clan, setClan] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...clan].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setClan(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...clan].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setClan(sorted);
      setOrder("ASC");
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`/getclan`);
      setClan(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteClan = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deleteclan/${id}`);

      getData();
    } catch (error) {
      window.alert(error);
    }
  };

  const itemPerPage = 4;

  const numberOfPage = Math.ceil(clan.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = clan.slice(
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
                <div class="dash-content  pt-3">
                  <div class="overview">
                    <div
                      class="title"
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      <NavLink
                        to={`/addblogpost`}
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
                          Add New Blog
                        </button>
                      </NavLink>
                    </div>
                  </div>

                  <div class="activity">
                    <div class="title mt-0">
                      <span class="text">All Clan</span>
                    </div>

                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th
                            style={{ cursor: "pointer" }}
                            onClick={() => sorting("clan_name")}
                          >
                            Clan Name <i class="bi bi-funnel-fill"></i>
                          </th>
                          <th scope="col">Parent Clan</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.length > 0
                          ? rows

                              .filter((item) => {
                                const searchTerm = searchFilter.toLowerCase();
                                return item.clan_name.startsWith(searchTerm);
                              })

                              .map((e, idx) => {
                                let flag = 0;
                                return (
                                  <>
                                    <tr>
                                      <th scope="row">{e.id}</th>
                                      <td>{e.clan_name}</td>
                                      <td>
                                        {clan.map((x) => {
                                          if (e.parent_clan === x.id) {
                                            flag = 1;
                                            return x.clan_name;
                                          }
                                        })}
                                        {flag === 0 ? "null" : ""}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => {
                                            deleteClan(e.id);
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
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
        </div>
      </div>
    </>
  );
};

export default AllBlogPost;
