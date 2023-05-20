import React, { useEffect, useState } from "react";
import Sidebars from "../../Layout/Sidebars";
import Navbar from "../../Layout/Navbar";
import axios from 'axios'

const Dashboard = () => {

    const [blogPost, setBlogPost] = useState([]);
    const [blogActivity, setBlogActivity] = useState([]);
    const [pb, setPb] = useState(0)
    const [df, setDf] = useState(0)
    let published = 0;
    let draft = 0;

    const getPosts = async () => {
        try {
            const res = await axios.get('/getblogposts');
            setBlogPost(res.data)


            res.data.map((e, idx) => {
                if (e.blog_status) {
                    published = published + 1;
                } else {
                    draft = draft + 1;
                }
            })
            setPb(published)
            setDf(draft)
        } catch (err) {
            console.log(err);
        }
    }

    const getActivityPosts = async (req, res) => {
        try {
            const res = await axios.get('/getblogactivity');
            setBlogActivity(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
        getActivityPosts();
    }, [])


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
                                    // value={searchFilter}
                                    // onChange={(e) => {
                                    //     setSearchFilter(e.target.value);
                                    // }}
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
                                    <div class="activity">
                                        <p
                                            class="mb-3"
                                            style={{ fontSize: 20, fontWeight: "bold" }}
                                        >
                                            Dashboard{" "}
                                        </p>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <table className="table"
                                                    style={{
                                                        border: "1px solid #C3C4C7",
                                                        backgroundColor: "#fff",
                                                        width: '30rem'
                                                    }}
                                                >
                                                    <tr>
                                                        <th className="m-0 p-2">At a Glance</th>
                                                    </tr>
                                                    <td></td>
                                                    <tr style={{ fontSize: '14px' }}>
                                                        <div className="row">
                                                            <div className="col-lg-6 pl-4">
                                                                <p>
                                                                    <i class="bi bi-pin-angle-fill"></i> {df + pb} Posts
                                                                </p>
                                                                <p>
                                                                    <i class="bi bi-chat-square-dots-fill"></i>{" "}
                                                                    Comments
                                                                </p>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <p>
                                                                    <i class="bi bi-heart-fill"></i>{" "}
                                                                    Blog Likes
                                                                </p>
                                                                <p>
                                                                    <i class="bi bi-heart-fill"></i>{" "}
                                                                    Book Likes
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className="col-lg-6"></div>
                                        </div>

                                        <div className="mt-3 row">
                                            <div className="col-lg-6">
                                                <table className="table"
                                                    style={{
                                                        border: "1px solid #C3C4C7",
                                                        backgroundColor: "#fff",
                                                        width:'30rem'
                                                    }}
                                                >
                                                    <tr>
                                                        <th className="m-0 p-2">Activity</th>
                                                    </tr>
                                                    <td className="pl-3" style={{ fontSize: '15px' }}>Recently Published</td>
                                                    <tr style={{ fontSize: '14px' }}>
                                                        {
                                                            blogActivity.map((e) => {
                                                                return (
                                                                    <>
                                                                        <div className="d-flex">
                                                                            <span className="pl-3">{e.blog_publish_date} {e.blog_time} </span> <span className="pl-4 pr-2 pt-1" style={{ flex: '1' }}>{e.blog_title}</span>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                </table>
                                            </div>
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
};

export default Dashboard;
