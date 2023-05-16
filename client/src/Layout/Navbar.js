import React, { useEffect } from 'react'

const Navbar = () => {

    

    return (
        <>
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
                                <input type="text" class="form-control bg-transparent border-0" placeholder="Search products" />
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar