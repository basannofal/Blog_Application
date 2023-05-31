import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';
import slugify from 'slugify';



const EditBlogPost = () => {



    const location = useLocation();
    const navigate = useNavigate();


    // Store Input Date in this State
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDesc, setBlogDesc] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogAuthor, setBlogAuthor] = useState("");
    const [blogPublishDate, setBlogPublishDate] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogKeywords, setBlogKeywords] = useState([]);
    const [blogTags, setBlogTags] = useState([]);
    const [blogSlug, setBlogSlug] = useState('');


    // Store the Category Data in this State
    const [category, setCategory] = useState([]);



    // keyword 

    // Function to handle Enter key press
    const handleKeyword = (event) => {
        if (event.key === 'Enter' || event.key == ",") {
            // Add the entered keyword to the keywords array
            event.preventDefault();
            setBlogKeywords([...blogKeywords, event.target.value]);
            console.log(event.target.value);
            console.log(blogKeywords);
            // Clear the input field
            event.target.value = '';
        }

    };

    const RemoveKeyword = (idx) => {

        const newArray = [...blogKeywords];
        newArray.splice(idx, 1);
        setBlogKeywords(newArray)
    }




    
        // Tags 

    // Function to handle Enter key press
    const handleTags = (event) => {
        if (event.key === 'Enter' || event.key == ",") {
            // Add the entered keyword to the keywords array
            event.preventDefault();
            setBlogTags([...blogTags, event.target.value]);
            console.log(event.target.value);
            console.log(blogTags);
            // Clear the input field
            event.target.value = '';
        }

    };

    const RemoveTags = (idx) => {

        const newArray = [...blogTags];
        newArray.splice(idx, 1);
        setBlogTags(newArray)
    }











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


    //get blog detail
    const getBlogDetail = async () => {
        try {
            const res = await axios.get(`/getblogpostdetail/${location.state.id}`);
            setBlogTitle(res.data[0].blog_title)
            setBlogDesc(res.data[0].blog_description)
            setBlogContent(res.data[0].blog_content)
            setBlogAuthor(res.data[0].blog_author)
            setBlogPublishDate(res.data[0].blog_publish_date)
            setBlogCategory(res.data[0].blog_category)
            setBlogImage(res.data[0].blog_image);
            const str = res.data[0].blog_keywords;
            setBlogKeywords(str.split(","))
            const strtags = res.data[0].blog_tags;
            setBlogTags(strtags.split(","))
            setBlogSlug(res.data[0].blog_slug)
            console.log(res.data[0])

        } catch (error) {
            window.alert(error);
        }
    }


    const blocksFromHtml = htmlToDraft(location.state.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );
    const [convertedContent, setConvertedContent] = useState(null);


    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };


    useEffect(() => {
        getBlogDetail();
        getData();
    }, []); // Empty dependency array




    const blockToHTML = (block) => {
        if (block.type === 'code') {
            return <div><code>{block.text}</code></div>;
        }
        // Handle other block types if needed
    };

    const options = {
        blockToHTML,
    };

    // ...




    useEffect(() => {
        const html = convertToHTML(options)(editorState.getCurrentContent());
        setConvertedContent(html);
        console.log(location.state.content);
    }, [editorState]);




    // Save the data in database
    const savedata = async (e, blogStatus) => {
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
            formdata.append("blogSlug", blogSlug);
            formdata.append("blogStatus", blogStatus);

            const res = axios.patch(`/editblogpost/${location.state.id}`, formdata);

            if (!res) {
                window.alert("Blog not Updated 😂");
            } else {
                window.alert("Blog updated Successfully 👍");
                navigate('/allblogpost', { replace: true })
            }
        } catch (e) {
            console.log(e);
        }
    };


    


    const generateSlug = (blogTitle) => {
        const options = {
            replacement: '-',  // Replace spaces with -
            remove: /[*+~.()'"!:@]/g,  // Remove special characters
            lower: true  // Convert to lowercase
        };
        const newSlug = slugify(blogTitle, options);
        setBlogSlug(newSlug);
    };


    const checkSlugAvailability = async (slug) => {
        try {
            const response = await axios.get(`/checkSlugAvailability/${slug}/${location.state.id}`);
            const { isAvailable } = response.data;

            // Handle the response accordingly
            if (isAvailable) {
                // Slug is available
                incrementSlug(blogSlug)
                console.log("Slug is available");
            } else {
                // Slug is not available
                console.log("Slug is same as original");
            }
        } catch (error) {
            // Handle any errors
            console.error("Error checking slug availability:", error);
        }
    };

    const incrementSlug = (slug) => {
        const lastChar = slug[slug.length - 1];
        
        if (!isNaN(lastChar)) {
          // Last character is a number, increment it by 1
          const newLastChar = parseInt(lastChar, 10) + 1;
          setBlogSlug(slug.slice(0, -1) + newLastChar);
        } else {
          // Last character is an alphabet, append '1' to the slug
          setBlogSlug(slug + '1');
        }
      };
      


    useEffect(() => {
        checkSlugAvailability(blogSlug);
    }, [blogSlug]);


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
                            <p class=" pb-1" style={{ fontSize: 20, fontWeight: "bold" }}>Edit Blog Post </p>
                            <form
                                encType="multipart/form-data"
                                method="POST"
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
                                                                console.log(blogTitle)
                                                                setBlogTitle(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <div style={{ border: '1px solid #CCCCCC', minHeight: 300, backgroundColor: "#fff" }}>
                                                            <Editor
                                                                editorState={editorState}
                                                                onEditorStateChange={onEditorStateChange}
                                                                toolbarClassName="toolbarClassName"
                                                                wrapperClassName="wrapperClassName"
                                                                editorClassName="editorClassName"
                                                            />
                                                        </div>
                                                        <label for="name">Blog Title</label>
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

                                                        <div className="group mb-4">
                                                            <label for="name" className="px-3">Old Image</label>
                                                            <img src={(`./uploads/Blog/${blogImage}`)} style={{ height: "200px", width: "200px" }} />
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
                                                                <option selected>Select Blog Category</option>
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
                                                                type="text"
                                                                onKeyDown={handleKeyword}
                                                            />
                                                            <label for="name">Blog Keywords</label>

                                                            <div className="container">
                                                                {blogKeywords.map((keyword, index) => (

                                                                    <div key={index} className=" row bg-light py-2 mb-2"  >
                                                                        <div className="col-lg-10" >{keyword}</div>
                                                                        <div className="col-lg-2" >
                                                                            <i class="bi bi-x-circle" onClick={() => { RemoveKeyword(index) }}></i>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div class="group">
                                                        <input
                                                                type="text"
                                                                onKeyDown={handleTags}
                                                            />
                                                            <label for="name">Blog Tags</label>

                                                            <div className="container">
                                                                {blogTags.map((tags, index) => (

                                                                    <div key={index} className=" row bg-light py-2 mb-2"  >
                                                                        <div className="col-lg-10" >{tags}</div>
                                                                        <div className="col-lg-2" >
                                                                            <i class="bi bi-x-circle" onClick={() => { RemoveTags(index) }}></i>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>


                                                        
                                                        <div class="group mt-3">
                                                            <input
                                                                placeholder=""
                                                                type="text"
                                                                value={blogSlug}
                                                                onChange={(e) => {
                                                                    setBlogSlug(e.target.value);
                                                                    generateSlug(e.target.value)
                                                                }}
                                                                required
                                                            />
                                                            <label for="name">Blog Slug</label>
                                                        </div>


                                                        <div className="row">
                                                            <button className="col-lg-5 ml-2" type="submit" onClick={(e) => savedata(e, 1)}>Publish</button>
                                                            <button className="col-lg-5 ml-4" type="submit" onClick={(e) => savedata(e, 0)}  >Save Draft</button>
                                                        </div>
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

export default EditBlogPost;

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
