import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";

const AllTrashBlogPost = () => {
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogPost, setBlogPost] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pb, setPb] = useState(0)

  const getPosts = async () => {
    try {
      const res = await axios.get('/gettrashblogpost');
      setBlogPost(res.data)

      setPb(res.data.length)
    } catch (err) {
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      const res = await axios.get(`/getblogcategory`);
      setBlogCategory(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getPosts();
    getData();
  }, []);

  const trashBackBlogPost = async (id) => {
    try {
      const res = await axios.patch(`/trashbackblogpost/${id}`);
      getPosts();
    } catch (error) {
      window.alert(error);
    }
  };

  const itemPerPage = 10;

  const numberOfPage = Math.ceil(blogPost.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPage }, (_, idx) => idx + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rows = blogPost.slice(
    currentPage * itemPerPage,
    (currentPage + 1) * itemPerPage
  );


  const DeletePost = async (id) => {
    try {
        const res = await axios.delete(`/deletepost/${id}`);
        getPosts();
      } catch (error) {
        window.alert(error);
      }
  }


  const DeleteAlert = async (id) =>{
    let title;
    try {
        const res = await axios.get(`/getblogpostdetail/${id}`);
        title = res.data[0].blog_title;
      } catch (error) {
        window.alert(error);
    }
     let x =window.prompt(`Enter Title Name = ${title} `, '');
     if(x==title){
        DeletePost(id);
     }else{
        window.alert("Oops ! Title is Incorrect")
     }
  }

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
                          New Post
                        </button>
                      </NavLink>
                    </div>
                  </div>

                  <div class="activity">

                    <p class="mb-3" style={{ fontSize: 20, fontWeight: "bold" }}>All Trash Blog Post </p>

                  <div className="d-flex" style={{fontSize:"14px"}}>
                          <NavLink to={'/allblogpost'} className='text-decoration-none'><p className="text-primary"> <i class="bi bi-arrow-left"></i> &nbsp; Back</p></NavLink>
                          <p className="mx-2">|</p>
                          <p className="text-danger" >Trash ({pb})</p>
                        

                  </div>
                    <table class="table table-striped" style={{border:"1px solid #C3C4C7", backgroundColor:"#fff"}}>
                      <thead>
                        <tr>
                          <th scope="col">Blog Title</th>
                          <th scope="col">Blog Author</th>
                          <th scope="col">Blog Category</th>
                          <th scope="col">Blog Tags</th>
                          <th scope="col">Blog Publish Date</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: '15px' }}>
                        {rows.length > 0
                          ? rows
                            .filter((item) => {
                              const searchTerm = searchFilter.toLowerCase();
                              return item.blog_title.startsWith(searchTerm) || item.blog_author.startsWith(searchTerm) || item.blog_tags.startsWith(searchTerm) || item.blog_publish_date.startsWith(searchTerm);
                            })

                            .map((e, idx) => {
                              let flag = 0;

                                
                                return (
                                  <>
                                  <tr className="blog-title">
                                    <td  style={{width:"33%"}}>
                                      {e.blog_title}
                                      <p className="p-0 m-0 tred " style={{ fontSize: '14px' }}>
                                        <div className="d-flex">

                                          <p className=" p-0 m-0" onClick={() => { trashBackBlogPost(e.id) }}> Restore</p>
                                          <p className="mx-1 m-0 p-0">|</p>
                                          <p className="p-0 m-0 text-danger" onClick={() => { DeleteAlert(e.id) }}>Permenently Delete </p>
                                        </div>
                                      </p>
                                    </td>
                                    <td>{e.blog_author}</td>
                                    <td>
                                      {blogCategory.map((x) => {
                                        if (e.blog_category === x.id) {
                                          flag = 1;
                                          return x.category_name;
                                        }
                                      })}
                                      {flag === 0 ? "null" : ""}
                                    </td>
                                    <td>{e.blog_tags}</td>
                                    <td>
                                      {
                                        e.blog_status == 0 ? <p className="m-0 p-0">Draft</p> : <p className="m-0 p-0">Published</p>
                                      }
                                      {e.blog_publish_date} {e.blog_time}
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
};

export default AllTrashBlogPost;
