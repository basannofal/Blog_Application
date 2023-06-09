import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AddBlogCategory from '../Pages/Blog/AddBlogCategory';
import AddBlogPost from '../Pages/Blog/AddBlogPost';
import AllBlogPost from '../Pages/Blog/AllBlogPost';
import AllTrashBlogPost from '../Pages/Blog/AllTrashBlogPost'
import EditBlogPost from '../Pages/Blog/EditBlogPost';
import PreviewPost from '../Pages/Blog/PreviewPost';

function Blog() {
    return (
        <>
            <Routes>
                <Route path="/addblogcategory" element={<AddBlogCategory />}></Route>
            </Routes>

            <Routes>
                <Route path="/addblogpost" element={<AddBlogPost />}></Route>
            </Routes>

            <Routes>
                <Route path="/allblogpost" element={<AllBlogPost />}></Route>
            </Routes>

            <Routes>
                <Route path="/alltrashblogpost" element={<AllTrashBlogPost />}></Route>
            </Routes>

            <Routes>
                <Route path="/editblogpost/:id" element={<EditBlogPost />}></Route>
            </Routes>

            <Routes>
                <Route path="/preview/:id" element={<PreviewPost />}></Route>
            </Routes>


        </>
    );
}
export default Blog;