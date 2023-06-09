import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AllBooks from '../Pages/Books/AllBooks';
import AddBook from '../Pages/Books/AddBook';
import AddBookCategory from '../Pages/Books/AddBookCategory';
import AllTrashBooks from '../Pages/Books/AllTrashBooks';
import EditBook from '../Pages/Books/EditBook';

const Books = () => {
    return (
        <>
            <Routes>
                <Route path="/allbooks" element={<AllBooks />}></Route>
            </Routes>

            <Routes>
                <Route path="/addbook" element={<AddBook />}></Route>
            </Routes>

            <Routes>
                <Route path="/bookcategory" element={<AddBookCategory />}></Route>
            </Routes>

            <Routes>
                <Route path="/alltrashbooks" element={<AllTrashBooks />}></Route>
            </Routes>

            <Routes>
                <Route path="/editbook/:id" element={<EditBook />}></Route>
            </Routes>

        </>
    )
}

export default Books