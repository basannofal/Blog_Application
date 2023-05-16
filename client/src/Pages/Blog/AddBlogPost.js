import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

const AddBlogPost = () => {

    const editorRef = useRef(null);

    // Store Input Date in this State
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDesc, setBlogDesc] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogAuthor, setBlogAuthor] = useState("");
    const [blogPublishDate, setBlogPublishDate] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogKeywords, setBlogKeywords] = useState("");
    const [blogTags, setBlogTags] = useState("");

    // Store the Category Data in this State
    const [category, setCategory] = useState([]);

    const handleBlogContent = (newContent) => {
        setBlogContent(newContent);
    };
    // Get Category Data
    const getData = async () => {
        try {
            const res = await axios.get(`/getblogcategory`);
            setCategory(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);


    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    useEffect(() => {
        getData();
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);


    const sate = () => {
        console.log(convertedContent);
    }




    // Save the data in database
    const savedata = async (e) => {
        e.preventDefault();

        try {
            // Appends all field data
            const formdata = new FormData();

            formdata.append("blogTitle", blogTitle);
            formdata.append("blogDesc", blogDesc);
            formdata.append("blogContent", convertedContent);
            formdata.append("blogAuthor", blogAuthor);
            formdata.append("blogPublishDate", blogPublishDate);
            formdata.append("blogImage", blogImage);
            formdata.append("blogCategory", blogCategory);
            formdata.append("blogKeywords", blogKeywords);
            formdata.append("blogTags", blogTags);

            const res = axios.post("/addblogpost", formdata);

            if (!res) {
                window.alert("Blog is not Inserted 😂");
            } else {
                window.alert("Blog is Inserted Successfully 👍");
                window.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

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
                                        placeholder="Search Blog"
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
                            <p class=" pb-1" style={{ fontSize: 20, fontWeight: "bold" }}>Add New Blog Post </p>
                            <form
                                encType="multipart/form-data"
                                method="POST"
                                onSubmit={savedata}
                            >
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div class="dash-content mt-0">
                                            <div class="card rounded-0">
                                                <div class="form">


                                                    <div class="group">
                                                        <input
                                                            placeholder=""
                                                            type="text"
                                                            value={blogTitle}
                                                            onChange={(e) => {
                                                                setBlogTitle(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <label for="name">Blog Title</label>
                                                    </div>

                                                    <div style={{ border: '1px solid #CCCCCC', minHeight: 300, backgroundColor: "#fff" }}>
                                                        <Editor
                                                            editorState={editorState}
                                                            onEditorStateChange={onEditorStateChange}
                                                            toolbarClassName="toolbarClassName"
                                                            wrapperClassName="wrapperClassName"
                                                            editorClassName="editorClassName"
                                                        />
                                                    </div>


                                                    <div class="group mt-4">
                                                        <textarea
                                                            placeholder=""
                                                            type="text"
                                                            value={blogDesc}
                                                            onChange={(e) => {
                                                                setBlogDesc(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <label for="name">Blog Description</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <section>
                                            <div class="dash-content mt-0">
                                                <div class="card rounded-0">
                                                    <div class="form" >






                                                        <div class="group ">
                                                            <input
                                                                placeholder=""
                                                                type="text"
                                                                value={blogAuthor}
                                                                onChange={(e) => {
                                                                    setBlogAuthor(e.target.value);
                                                                }}
                                                                required
                                                            />
                                                            <label for="name">Blog Author</label>
                                                        </div>

                                                        <div class="group">
                                                            <input
                                                                placeholder=""
                                                                type="date"
                                                                format="dd-MM-yyyy"
                                                                value={blogPublishDate}
                                                                onChange={(e) => {
                                                                    setBlogPublishDate(e.target.value);
                                                                }}
                                                                required
                                                            />
                                                            <label for="name">Blog Publish Date</label>
                                                        </div>

                                                        <div class="group">
                                                            <input
                                                                placeholder=""
                                                                name="blog_image"
                                                                type="file"
                                                                onChange={(e) => {
                                                                    setBlogImage(e.target.files[0]);
                                                                }}
                                                                required
                                                            />
                                                            <label for="name">Blog Image</label>
                                                        </div>

                                                        <div className="group">
                                                            <label for="exampleInputEmail1">Select Blog Category</label>
                                                            <select
                                                                name="blog_category"
                                                                placeholder=""
                                                                id="blog_category"
                                                                value={blogCategory}
                                                                onChange={(e) => {
                                                                    setBlogCategory(e.target.value);
                                                                }}
                                                            >
                                                                {category.map((e) => {
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
                                                                value={blogKeywords}
                                                                onChange={(e) => {
                                                                    setBlogKeywords(e.target.value);
                                                                }}
                                                                required
                                                            />
                                                            <label for="name">Blog Keywords</label>
                                                        </div>

                                                        <div class="group">
                                                            <input
                                                                placeholder=""
                                                                type="text"
                                                                value={blogTags}
                                                                onChange={(e) => {
                                                                    setBlogTags(e.target.value);
                                                                }}
                                                                required
                                                            />
                                                            <label for="name">Blog Tags</label>
                                                        </div>

                                                        <button type="submit">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBlogPost;

// Second Style Add Blog Post Code here.............

//******* Set State Code ********//

// const [blogPost, setBlogPost] = useState({
//     blog_title: "",
//     blog_description: "",
//     blog_content: "",
//     blog_author: "",
//     blog_publish_date: "",
//     blog_image: "",
//     blog_category: "",
//     blog_keywords: "",
//     blog_tags: "",
// });

//********* handle inputs code **********//

// let name, value;
// const handleInputs = (e) => {
//     name = e.target.name;
//     value = e.target.value;

//     setBlogPost({ ...blogPost, [name]: value });
//     console.log(blogPost);
// };

//****** handle image Code ******//

// const handleImage = (e) => {
//     setBlogPost({ ...blogPost, blog_image: e.target.files[0] });
// };

// ******  Form Data Append Code ******* //

// formdata.append("blog_title", blogPost.blog_title);
// formdata.append("blog_description", blogPost.blog_description);
// formdata.append("blog_content", blogPost.blog_content);
// formdata.append("blog_author", blogPost.blog_author);
// formdata.append("blog_publish_date", blogPost.blog_publish_date);
// formdata.append("blog_image", blogPost.blog_image);
// formdata.append("blog_category", blogPost.blog_category);
// formdata.append("blog_keywords", blogPost.blog_keywords);
// formdata.append("blog_tags", blogPost.blog_tags);

//******* Input Field on this Code *******//

{
    /* <div class="group">
            <input placeholder="" type="text" name='blog_title' onChange={handleInputs} required />
            <label for="name">Blog Title</label>
        </div> */
}

{
    /* <div class="group">
            <input placeholder="" type="text" name='blog_description' onChange={handleInputs} required />
            <label for="name">Blog Desc</label>
        </div> */
}

{
    /* <div class="group">
            <input placeholder="" type="text" name='blog_content' onChange={handleInputs} required />
            <label for="name">Blog Content</label>
        </div> */
}

{
    /* <div class="group">
            <input placeholder="" type="text" name='blog_author' onChange={handleInputs} required />
            <label for="name">Blog Author</label>
        </div> */
}

{
    /* <div class="group">
            <input placeholder="" type="date" name='blog_publish_date' onChange={handleInputs} required />
            <label for="name">Blog Date</label>
        </div> */
}

{
    /* <div class="group">
            <input placeholder="" name="blog_image" type="file" onChange={handleImage} required />
            <label for="name">Blog Image</label>
        </div> */
}

{
    /* <div className="group">
            <label for="exampleInputEmail1">Select Blog Category</label>
            <select name="blog_category" placeholder='' id="blog_category" onChange={handleInputs} >
                <option value="Null">Null</option>
                {
                    post.map((e) => {
                        return (
                            <>
                                <option value={e.id}>{e.category_name}</option>
                            </>
                        )
                    })
                }
            </select>
        </div> */
}

{
    /* <div class="group">
      <input placeholder="" type="text" name='blog_keywords' onChange={handleInputs} required />
      <label for="name">Blog Keywords</label>
  </div> */
}

{
    /* <div class="group">
      <input placeholder="" type="text" name='blog_tags' onChange={handleInputs} required />
      <label for="name">Blog Tags</label>
  </div> */
}
