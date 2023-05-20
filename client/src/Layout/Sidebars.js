import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


export const Sidebars = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                        <a
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
                        </a>
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
                        <a class="nav-link" href="pages/icons/mdi.html">
                            <span class="icon-bg">
                                <i className='uil uil-estate  menu-icon'></i>
                            </span>
                            <span class="menu-title">Icons</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pages/forms/basic_elements.html">
                            <span class="icon-bg"><i class="mdi mdi-format-list-bulleted menu-icon"></i></span>
                            <span class="menu-title">Forms</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pages/charts/chartjs.html">
                            <span class="icon-bg"><i class="mdi mdi-chart-bar menu-icon"></i></span>
                            <span class="menu-title">Charts</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pages/tables/basic-table.html">
                            <span class="icon-bg"><i class="mdi mdi-table-large menu-icon"></i></span>
                            <span class="menu-title">Tables</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <span class="icon-bg"><i class="mdi mdi-lock menu-icon"></i></span>
                            <span class="menu-title">User Pages</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="auth">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                                <li class="nav-item"> <a class="nav-link" href="pages/samples/login.html"> Login </a></li>
                                <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> Register </a></li>
                                <li class="nav-item"> <a class="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                                <li class="nav-item"> <a class="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item sidebar-user-actions">
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

