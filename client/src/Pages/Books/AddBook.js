import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebars from "../../Layout/Sidebars";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {

  const navigate = useNavigate();
  // Store Input Date in this State
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookDesc, setBookDesc] = useState('');
  const [bookThumnail, setBookThumnail] = useState('');
  const [bookPDF, setBookPDF] = useState('');
  const [bookIsDownloadable, setBookIsDownloadable] = useState(true);
  const [bookCategory, setBookCategory] = useState(null);


  // const [blogStatus, setBlogStatus] = useState(1);

  // Store the Category Data in this State
  const [category, setCategory] = useState([]);

  // Get Category Data
  const getData = async () => {
    try {
      const res = await axios.get(`/getbookcategory`);
      setCategory(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();

  }, []);


  // book thumnail
  const handlethumnail = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg") {
        toast.error('Only .jpg/.png/.jpeg File Allowded')
        return
      }
      setBookThumnail(file);
    } else {
      window.alert("No file selected.");
    }
    // setBookThumnail(e.target.files[0]);
  };



  // handle pdf

  const handletPDF = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error('Only PDF File Allowded')
        return
      }
      setBookPDF(file);
    } else {
      window.alert("No file selected.");
    }
    // setBookPDF(e.target.files[0]);
  };

  // Save the data in database
  const savedata = async (e) => {
    e.preventDefault();

    try {
      if (bookCategory == null) {
        toast.error("Select Category");
        return
      }


      const formdata = new FormData();

      formdata.append("bookTitle", bookTitle);
      formdata.append("bookAuthor", bookAuthor);
      formdata.append("bookDesc", bookDesc);
      formdata.append("bookthumnail", bookThumnail);
      formdata.append("bookpdf", bookPDF);
      formdata.append("bookIsDownloadable", bookIsDownloadable);
      formdata.append("bookCategory", bookCategory);

      for (const value of formdata.values()) {
        console.log(value);
      }

      axios.post("/addbook", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((data) => {
        toast.success("Book Added");
        // navigate('/allbooks', { replace: true })
      }).catch((e) => {
        console.log(e);
        toast.error("Book Upload Failed")
      })


    } catch (e) {
      console.log(e);
    }
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
  const savenamescategory = async (e) => {
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
          toast.success("Category Added Successfully");
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




  // readio button


  const handleRadioChange = (event) => {
    setBookIsDownloadable(event.target.value);
  };



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
              <p class=" pb-1" style={{ fontSize: 20, fontWeight: "bold" }}>Add New Book </p>
              <form
                encType="multipart/form-data"
                method="POST"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div class="dash-content mt-0">
                      <div class="card rounded-0">
                        <div class="form">


                          <div class="group">
                            <input
                              placeholder=""
                              type="text"
                              value={bookTitle}
                              onChange={(e) => {
                                setBookTitle(e.target.value);
                              }}
                              id="title"
                              required
                            />
                            <label for="title">Book Title</label>
                          </div>


                          <div class="group mt-2">
                            <input
                              placeholder=""
                              type="text"
                              value={bookAuthor}
                              onChange={(e) => {
                                setBookAuthor(e.target.value);
                              }}
                              id="author"
                              required
                            />
                            <label for="author">Book Author</label>
                          </div>


                          <div class="group mt-2">
                            <textarea
                              placeholder=""
                              type="text"
                              value={bookDesc}
                              onChange={(e) => {
                                setBookDesc(e.target.value);
                              }}
                              id="desc"
                              required
                            />
                            <label for="desc">Book Description</label>
                          </div>




                          <div>
                            <FormControl >
                              <FormLabel id="demo-radio-buttons-group-label">Book Download ?</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={bookIsDownloadable}
                                onChange={handleRadioChange}
                              >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                              </RadioGroup>
                            </FormControl>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <section>
                      <div class="dash-content mt-0">
                        <div class="card rounded-0">
                          <div class="form" >



                            <div className="group ">
                              <label for="blog_category">Select Book Category</label>
                              <select
                                className="mb-0"
                                name="blog_category"
                                placeholder=""
                                id="blog_category"
                                value={bookCategory}
                                onChange={(e) => {
                                  setBookCategory(e.target.value);
                                }}
                              >
                                <option selected value={null}>Select Book Category</option>
                                {category.map((e) => {
                                  return (
                                    <>
                                      <option value={e.id}>{e.category_name}</option>
                                    </>
                                  );
                                })}
                              </select>
                              <NavLink onClick={handleClickOpen('paper')}><div className="mb-4 mt-1" style={{ fontSize: 14 }}> Add New Category</div></NavLink>
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
                                            id="catname"
                                            required
                                          />
                                          <label for="catname">Book Category Name</label>
                                        </div>

                                        <div className="group">
                                          <label for="blog_subcategory">Book Sub Category</label>
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
                                            id="blogdesc"
                                            required
                                          />
                                          <label for="blogdesc">Category Description</label>
                                        </div>


                                      </form>
                                    </div>
                                  </div>
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" onClick={savenamescategory}>Submit</Button>
                              </DialogActions>
                            </Dialog>




                            <div class="group mt-2">
                              <input type="file" className='inputtag form-control' placeholder="Book Thumnail" name='bookthumnail' onChange={handlethumnail} id="bookimg" />
                              <label for="bookimg">Book Thumnail</label>
                            </div>


                            <div class="group mt-2">
                              <input type="file" className='inputtag form-control' placeholder="Book PDF" id="pdfimg" name='bookpdf' onChange={handletPDF} />
                              <label for="pdfimg">Book PDF</label>
                            </div>





                            <div className="row mt-4 ">
                              <div className="col-lg-5">
                                <button className="w-100" type="submit" onClick={savedata}>
                                  Publish
                                </button>
                              </div>

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
  )
}

export default AddBook