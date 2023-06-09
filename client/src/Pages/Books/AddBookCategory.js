import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBookCategory = () => {

  const navigate = useNavigate();
  // fields of table
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [subCategory, setSubCategory] = useState(null);

  // data store 
  const [bookCategory, setbooklogCategory] = useState([]);

  // search item
  const [searchFilter, setSearchFilter] = useState("");

  // sort item
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...bookCategory].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setbooklogCategory(sorted);
      setOrder("DSC")
    }

    if (order === "DSC") {
      const sorted = [...bookCategory].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setbooklogCategory(sorted);
      setOrder("ASC")
    }
  }

  // get blog category data

  const getData = async () => {
    try {
      const res = await axios.get(`/getbookcategory`);
      setbooklogCategory(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // save the blog category data

  const savedata = async (e) => {
    e.preventDefault();
    const team = {
      categoryName: categoryName,
      categoryDesc: categoryDesc,
      subCategory: subCategory,
    };
    console.log(team);
    try {
      await axios
        .post("/addbookcategory", team)
        .then((res) => {
          console.log(res);
          toast.success(" Category Added Successfully");
          getData();
        })
        .catch((e) => {
          toast.error("Category Failed");
        });
    } catch (error) {
      toast.error("Category Failed");
    }
  };


  const delebookBlogCategory = async (id) => {
    try {
      console.log(id);
      if (window.confirm("Are you sure you want to delete this record")) {
        const res = await axios.delete(`/deletebookcategory/${id}`);
        toast.success(" Category Delete Successfully");
        getData();
      }
    } catch (error) {
      window.alert(error);
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
            <a class="navbar-brand brand-logo" href="">Blog App</a>
            <a class="navbar-brand brand-logo-mini" href="">Blog</a>
          </div>

          <div class="navbar-menu-wrapper d-flex" >

            <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
              <span class="mdi mdi-menu"></span>
            </button>

            <div class="search-field d-none d-xl-block">
              <form class="d-flex align-items-center h-100" action="#">
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <i class="input-group-text border-0 mdi mdi-magnify"></i>
                  </div>
                  <input type="text" class="form-control bg-transparent border-0" placeholder="Search Blog Category" value={searchFilter} onChange={(e) => { setSearchFilter(e.target.value) }} />
                </div>
              </form>
            </div>
          </div>
        </nav>

        <div class="container-fluid page-body-wrapper">

          <Sidebars />
          <div class="main-panel">
            <div class="content-wrapper">

              <section >
                <div class="row">
                  <div class="dash-content col-lg-6 mt-5">
                    <div className="card rounded-0">
                      <div class="activity">
                        <div class="title my-3">
                          <span class="text ">Books Category</span>
                        </div>

                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th style={{ cursor: 'pointer' }} onClick={() => sorting("category_name")} >Category<i class="bi bi-funnel-fill"></i></th>
                              <th scope="col">Sub Category</th>
                              <th scope="col">Description</th>
                              <th scope="col">Handle</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookCategory.length > 0
                              ? bookCategory.filter((item) => {

                                return (
                                  searchFilter.toLowerCase() === "" ? item : item.category_name.toLowerCase().startsWith(searchFilter)
                                )
                              })

                                .map((e, idx) => {
                                  let flag = 0;
                                  return (
                                    <>
                                      <tr>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{e.category_name}</td>
                                        <td>
                                          {bookCategory.map((x) => {
                                            if (e.sub_category === x.id) {
                                              flag = 1;
                                              return x.category_name;
                                            }
                                          })}
                                          {flag === 0 ? "null" : ""}
                                        </td>
                                        <td>
                                          {e.category_description}
                                        </td>
                                        <td>
                                          <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                              delebookBlogCategory(e.id);
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
                    </div>
                  </div>

                  <div class="dash-content col-lg-6 mt-5">
                    <div class="card rounded-0">
                      <span class="title mt-2">Add Category </span>
                      <form class="form">
                        <div class="group">
                          <input
                            placeholder=""
                            type="text"
                            value={categoryName}
                            onChange={(e) => {
                              setCategoryName(e.target.value);
                            }}
                            required
                          />
                          <label for="name">Category Name</label>
                        </div>

                        <div className="group">
                          <label for="exampleInputEmail1">Sub Category</label>
                          <select
                            name="blog_subcategory"
                            placeholder=""
                            id="blog_subcategory"
                            value={subCategory}
                            onChange={(e) => {
                              setSubCategory(e.target.value);
                            }}
                            required
                          >
                            <option value="Null">Null</option>
                            {bookCategory.map((e) => {
                              return (
                                <>
                                  <option value={e.id}>{e.category_name}</option>
                                </>
                              );
                            })}
                          </select>
                        </div>

                        <div class="group">
                          <input
                            placeholder=""
                            type="text"
                            value={categoryDesc}
                            onChange={(e) => {
                              setCategoryDesc(e.target.value);
                            }}
                            required
                          />
                          <label for="name">Category Description</label>
                        </div>

                        <button type="submit" onClick={savedata}>
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>




            </div>

          </div>
        </div>
      </div>


    </>
  );
}

export default AddBookCategory