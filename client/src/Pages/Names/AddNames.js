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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const AddNames = () => {
    const navigate = useNavigate();
    // Store Input Date in this State
    const [nameLang1, setNameLang1] = useState('');
    const [nameDesc, setNameDesc] = useState('');
    const [nameLang2, setNameLang2] = useState('');
    const [nameMeaning, setNameMeaning] = useState('');
    const [nameGender, setNameGender] = useState('male');
    const [nameCategory, setNameCategory] = useState('');
    const [namePriority, setNamePriority] = useState(1);

    // const [blogStatus, setBlogStatus] = useState(1);

    // Store the Category Data in this State
    const [category, setCategory] = useState([]);

    // Get Category Data
    const getData = async () => {
        try {
            const res = await axios.get(`/getnamescategory`);
            setCategory(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getData();

    }, []);


    // Save the data in database
    const savedata = async (e) => {
        e.preventDefault();

        try {
      

            const names = {
                nameLang1: nameLang1,
                nameDesc: nameDesc,
                nameLang2: nameLang2,
                nameMeaning: nameMeaning,
                nameGender: nameGender,
                nameCategory: nameCategory,
                namePriority: namePriority,
              }


            const res = axios.post("/addnamepost", names);

            if (!res) {
                window.alert("name is not Inserted 😂");
            } else {
                window.alert("name is Inserted Successfully 👍");
                navigate('/allnames', { replace: true })
            }
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
                .post("/addnamescategory", team)
                .then((res) => {
                    console.log(res);
                    window.alert("Names Category Added Successfully");
                    setOpen(false);
                    setCategoryName('')
                    setCategoryDesc('')
                    setSubCategory('')
                    getData()
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.log(error);
        }
    };



    // priority slider 


    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 6,
            label: '6',
        },
        {
            value: 7,
            label: '7',
        },
        {
            value: 8,
            label: '8',
        },
        {
            value: 9,
            label: '9',
        },
        {
            value: 10,
            label: '10',
        },
    ];

    function valuetext(value) {
        setNamePriority(value)
        return `${value}`;
    }


    // readio button


    const handleRadioChange = (event) => {
        setNameGender(event.target.value);
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
                            <p class=" pb-1" style={{ fontSize: 20, fontWeight: "bold" }}>Add New Names </p>
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
                                                            value={nameLang1}
                                                            onChange={(e) => {
                                                                setNameLang1(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <label for="name">Name (language 1)</label>
                                                    </div>


                                                    <div class="group mt-2">
                                                        <input
                                                            placeholder=""
                                                            type="text"
                                                            value={nameLang2}
                                                            onChange={(e) => {
                                                                setNameLang2(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <label for="name">Name (Language 2)</label>
                                                    </div>


                                                    <div class="group mt-2">
                                                        <input
                                                            placeholder=""
                                                            type="text"
                                                            value={nameMeaning}
                                                            onChange={(e) => {
                                                                setNameMeaning(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <label for="name">Name Meaning</label>
                                                    </div>

                                                    <div class="group mt-2">
                                                        <textarea
                                                            placeholder=""
                                                            type="text"
                                                            value={nameDesc}
                                                            onChange={(e) => {
                                                                setNameDesc(e.target.value);
                                                            }}
                                                            required
                                                        />
                                                        <label for="name">Name Description</label>
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
                                                            <label for="exampleInputEmail1">Select Blog Category</label>
                                                            <select
                                                                className="mb-0"
                                                                name="blog_category"
                                                                placeholder=""
                                                                id="blog_category"
                                                                value={nameCategory}
                                                                onChange={(e) => {
                                                                    setNameCategory(e.target.value);
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
                                                                <Button variant="contained" onClick={savenamescategory}>Submit</Button>
                                                            </DialogActions>
                                                        </Dialog>


                                                        <div>
                                                            <FormControl >
                                                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    name="radio-buttons-group"
                                                                    value={nameGender}
                                                                    onChange={handleRadioChange}
                                                                >
                                                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                                    <FormControlLabel value="both" control={<Radio />} label="Both" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>



                                                        <div class="group mt-3">
                                                            <Typography id="non-linear-slider" gutterBottom>
                                                                Name Priority : {namePriority}
                                                            </Typography>
                                                            <Box sx={{ width: 300 }}>
                                                                <Slider
                                                                    aria-label="Always visible"
                                                                    defaultValue={1}
                                                                    getAriaValueText={valuetext}
                                                                    step={1}
                                                                    min={1}
                                                                    max={10}
                                                                    marks={marks}
                                                                    valueLabelDisplay="on"
                                                                />
                                                            </Box>

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

export default AddNames