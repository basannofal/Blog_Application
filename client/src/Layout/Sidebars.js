import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';


export const Sidebars = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNameDropDown, setIsNameDropDown] = useState(false);
    const [isBookDropdown, setIsBookDropdown] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const NametoggleDropdown = () => {
        setIsNameDropDown(!isNameDropDown);
    };

    const BooktoggleDropdown = () => {
        setIsBookDropdown(!isBookDropdown);
    };

    return (
        <>
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item nav-category">Main</li>
                    <li class="nav-item">
                        <NavLink to={'/'} className='text-decoration-none '><p className="nav-link my-0">
                            <span class="icon-bg">
                                <i className='mdi mdi-view-dashboard menu-icon'></i>
                            </span>
                            <span class="menu-title">Dashboard</span>
                        </p>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            className="nav-link"
                            data-bs-toggle="collapse"
                            aria-expanded={isDropdownOpen ? 'true' : 'false'}
                            aria-controls="ui-basic"
                            onClick={toggleDropdown}
                        >
                            <span className="icon-bg">
                                <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                            </span>
                            <span className="menu-title">Blogs</span>
                            <i className={`bi bi-arrow-${isDropdownOpen ? 'up' : 'down'}-short menu-arrow`}></i>
                        </NavLink>
                    </li>
                    {isDropdownOpen && (
                        <li className="nav-item ">
                            <NavLink to={'/allblogpost'} className='text-decoration-none '><p className="nav-link m-0 p-1">
                                <i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> All Posts </span>
                            </p></NavLink>
                        </li>
                    )}
                    {isDropdownOpen && (
                        <li className="nav-item">
                            <NavLink to={'/addblogpost'} className='text-decoration-none '><p className="nav-link m-0 p-1">
                                <i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> Add New </span>
                            </p></NavLink>
                        </li>
                    )}
                    {isDropdownOpen && (
                        <li className="nav-item">
                            <NavLink to={'/addblogcategory'} className='text-decoration-none'><p className="nav-link m-0 p-1"><i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> Category </span>
                            </p></NavLink>
                        </li>
                    )}



                    <li class="nav-item">
                        <NavLink to={'/addblogcategory'} className='text-decoration-none '><p className="nav-link my-0">
                            <span class="icon-bg">
                                <i className='bi bi-chat-right-text menu-icon'></i>
                            </span>
                            <span class="menu-title">Comments</span>
                        </p>
                        </NavLink>
                    </li>


                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            data-bs-toggle="collapse"
                            aria-expanded={isNameDropDown ? 'true' : 'false'}
                            aria-controls="ui-basic"
                            onClick={NametoggleDropdown}
                        >
                            <span className="icon-bg">
                                <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                            </span>
                            <span className="menu-title">Name</span>
                            <i className={`bi bi-arrow-${isNameDropDown ? 'up' : 'down'}-short menu-arrow`}></i>
                        </NavLink>
                    </li>
                    {isNameDropDown && (
                        <li className="nav-item ">
                            <NavLink to={'/allnames'} className='text-decoration-none '><p className="nav-link m-0 p-1">
                                <i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> All Names </span>
                            </p></NavLink>
                        </li>
                    )}
                    {isNameDropDown && (
                        <li className="nav-item">
                            <NavLink to={'/addnames'} className='text-decoration-none '><p className="nav-link m-0 p-1">
                                <i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> Add New </span>
                            </p></NavLink>
                        </li>
                    )}
                    {isNameDropDown && (
                        <li className="nav-item">
                            <NavLink to={'/addnamecategory'} className='text-decoration-none'><p className="nav-link m-0 p-1"><i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> Category </span>
                            </p></NavLink>
                        </li>
                    )}








                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            data-bs-toggle="collapse"
                            aria-expanded={isBookDropdown ? 'true' : 'false'}
                            aria-controls="ui-basic"
                            onClick={BooktoggleDropdown}
                        >
                            <span className="icon-bg">
                                <i className="mdi mdi-book menu-icon"></i>
                            </span>
                            <span className="menu-title">Books</span>
                            <i className={`bi bi-arrow-${isBookDropdown ? 'up' : 'down'}-short menu-arrow`}></i>
                        </NavLink>
                    </li>
                    {isBookDropdown && (
                        <li className="nav-item ">
                            <NavLink to={'/allbooks'} className='text-decoration-none '><p className="nav-link m-0 p-1">
                                <i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> All Books </span>
                            </p></NavLink>
                        </li>
                    )}
                    {isBookDropdown && (
                        <li className="nav-item">
                            <NavLink to={'/addbook'} className='text-decoration-none '><p className="nav-link m-0 p-1">
                                <i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> Add New </span>
                            </p></NavLink>
                        </li>
                    )}
                    {isBookDropdown && (
                        <li className="nav-item">
                            <NavLink to={'/bookcategory'} className='text-decoration-none'><p className="nav-link m-0 p-1"><i class="bi bi-arrow-right-short"></i> <span style={{ paddingLeft: '20px' }}> Category </span>
                            </p></NavLink>
                        </li>
                    )}




                    <li class="nav-item sidebar-user-actions mt-5">
                        <div class="user-details">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="d-flex align-items-center">
                                        <div class="sidebar-profile-img">
                                            <img src="assets/images/faces/face28.png" alt="image" />
                                        </div>
                                        <div class="sidebar-profile-text">
                                            <p class="mb-1">Henry Klein</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="badge badge-danger">3</div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item sidebar-user-actions">
                        <div class="sidebar-user-menu">
                            <a href="#" class="nav-link"><i class="mdi mdi-settings menu-icon"></i>
                                <span class="menu-title">Settings</span>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item sidebar-user-actions">
                        <div class="sidebar-user-menu">
                            <a href="#" class="nav-link"><i class="mdi mdi-speedometer menu-icon"></i>
                                <span class="menu-title">Take Tour</span></a>
                        </div>
                    </li>
                    <li class="nav-item sidebar-user-actions">
                        <div class="sidebar-user-menu">
                            <a href="#" class="nav-link"><i class="mdi mdi-logout menu-icon"></i>
                                <span class="menu-title">Log Out</span></a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebars;

