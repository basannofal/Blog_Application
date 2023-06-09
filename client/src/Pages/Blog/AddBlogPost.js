import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";
import { EditorState, convertToRaw, convertFromRaw, AtomicBlockUtils, Entity } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import slugify from 'slugify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import draftToHtml from 'draftjs-to-html';



const AddBlogPost = () => {
    const navigate = useNavigate();
    // Store Input Date in this State
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDesc, setBlogDesc] = useState("");
    const [blogSlug, setBlogSlug] = useState('');
    const [blogContent, setBlogContent] = useState("");
    const [blogAuthor, setBlogAuthor] = useState("");
    const [blogPublishDate, setBlogPublishDate] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogKeywords, setBlogKeywords] = useState([]);
    const [blogTags, setBlogTags] = useState([]);
    // const [blogStatus, setBlogStatus] = useState(1);

    // Store the Category Data in this State
    const [category, setCategory] = useState([]);

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



    // const blockToHTML = (block) => {
    //     console.log(block);
    //     if (block.type === 'code') {
    //         return <code>{block.text}</code>;
    //     }
    // };

    // const entityToHTML = (entity, originalText) => {
    //     console.log(entity);

    //     if (entity.type === 'IMAGE') {
    //         const { src, alt, width, height } = entity.data;
    //         return `<img src="${src}" alt="${alt}" width="${width}" height="${height}" />`;
    //     } else if (entity.type === 'LINK') {
    //         const { url} = entity.data;
    //         return `<a href="${url}">${originalText}</a>`;
    //     }


    //     return originalText;
    // };



    // const options = {
    //     blockToHTML,
    //     entityToHTML,
    // };



    // useEffect(() => {
    //     getData();

    //     const html = convertToHTML(options)(editorState.getCurrentContent());
    //     setConvertedContent(html);



    // }, [editorState]);


    const getBlockStyle = (data) => {
        let styles = '';
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                styles += `${key}:${value},`;
            }
        });
        return `{{${styles}}}`;
    };


    function getSectionText(text) {
        if (text && text.length > 0) {
            const chars = text.map((ch) => {
                switch (ch) {
                    case '\n':
                        return '<br />';
                    case '&':
                        return '&amp;';
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    default:
                        return ch;
                }
            });
            return chars.join('');
        }
        return '';
    }


    useEffect(() => {
        getData();

        const rawContentState = convertToRaw(editorState.getCurrentContent());

        const markup = draftToHtml(rawContentState, {
            blockStyleFn: (block) => getBlockStyle(block.data),
            customInlineFn: getSectionText,
        });

        setConvertedContent(markup);



    }, [editorState]);

    const handleImageUpload = async (file) => {

        return new Promise((resolve, reject) => {
            var reader = new window.FileReader();
            reader.onloadend = () => {
                const formData = new FormData();
                formData.append('image', file);
                axios.post('/saveimg', formData)

                    .then((data) => {
                        console.log(data);
                        console.log('Uploaded Data', data);
                        const { imageLink } = data.data;
                        console.log(imageLink);
                        resolve({ data: { link: imageLink } });
                    });
            }
            reader.readAsDataURL(file);
        });
    };





    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [subCategory, setSubCategory] = useState(null);
    const saveblogcategory = async (e) => {
        e.preventDefault();
        const team = {
            categoryName: categoryName,
            categoryDesc: categoryDesc,
            subCategory: subCategory,
        };
        console.log(team);
        try {
            await axios
                .post("/addblogcategory", team)
                .then((res) => {
                    console.log(res);
                    toast.success(" Category Added Successfully");
                    setOpen(false);
                    setCategoryName('')
                    setCategoryDesc('')
                    setSubCategory('')
                    getData()
                })
                .catch((e) => {
                    toast.error("Category Failed");
                });
        } catch (error) {
            toast.error("Category Failed");
        }
    };












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
            formdata.append("blogStatus", blogStatus);
            formdata.append("blogSlug", blogSlug);

            const res = axios.post("/addblogpost", formdata);

            if (!res) {
                toast.error("Blog Upload Failed");
            } else {
                toast.success("Blog Added Successfully");
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
            const response = await axios.get(`/checkSlugAvailability/${slug}`);
            const { isAvailable } = response.data;

            // Handle the response accordingly
            if (isAvailable) {
                // Slug is available
                incrementSlug(blogSlug)
                console.log("Slug is available");
            } else {
                // Slug is not available
                console.log("Slug is not available");
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
                                                                generateSlug(e.target.value)
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
                                                            toolbar={{
                                                                image: {
                                                                    uploadCallback: handleImageUpload,
                                                                    alt: { present: true, mandatory: false },
                                                                },
                                                            }}
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
                                                        <label for="name">Meta Description</label>
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

                                                        <div className="group ">
                                                            <label for="exampleInputEmail1">Select Blog Category</label>
                                                            <select
                                                                className="mb-0"
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
                                                            <NavLink onClick={handleClickOpen('paper')}><div className="mb-4" style={{ fontSize: 14 }}> Add New Category</div></NavLink>
                                                        </div>
                                                        <Dialog
                                                            open={open}
                                                            fullWidth={true}
                                                            onClose={handleClose}
                                                            scroll={scroll}
                                                            aria-labelledby="scroll-dialog-title"
                                                            aria-describedby="scroll-dialog-description"
                                                        >
                                                            <DialogTitle id="scroll-dialog-title">Add New Category</DialogTitle>
                                                            <DialogContent dividers={scroll === 'paper'}>
                                                                <DialogContentText
                                                                    id="scroll-dialog-description"
                                                                    ref={descriptionElementRef}
                                                                    tabIndex={-1}
                                                                >
                                                                    <div class="dash-content px-3" >
                                                                        <div class="card rounded-0">

                                                                            <form class="form" >
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
                                                                                    <label for="name">Blog Category Name</label>
                                                                                </div>

                                                                                <div className="group">
                                                                                    <label for="exampleInputEmail1">Blog Sub Category</label>
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
                                                                                        value={categoryDesc}
                                                                                        onChange={(e) => {
                                                                                            setCategoryDesc(e.target.value);
                                                                                        }}
                                                                                        required
                                                                                    />
                                                                                    <label for="name">Category Description</label>
                                                                                </div>


                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                                                <Button variant="contained" onClick={saveblogcategory}>Submit</Button>
                                                            </DialogActions>
                                                        </Dialog>
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

                                                        <div class="group mt-3">
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

export default AddBlogPost;
