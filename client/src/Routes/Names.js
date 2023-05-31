import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AddNameCategory from '../Pages/Names/AddNameCategory';
import AddNames from '../Pages/Names/AddNames';
import AllNames from '../Pages/Names/AllNames';
import AllTrashNames from '../Pages/Names/AllTrashNames';
import EditNames from '../Pages/Names/EditNames';

function Names() {
    return (
        <>
            <Routes>
                <Route  path="/addnamecategory" element={<AddNameCategory />}></Route>
            </Routes>

            <Routes>
                <Route  path="/addnames" element={<AddNames />}></Route>
            </Routes>

            <Routes>
                <Route  path="/allnames" element={<AllNames />}></Route>
            </Routes>

            <Routes>
                <Route  path="/alltrashnames" element={<AllTrashNames />}></Route>
            </Routes>
            
            <Routes>
                <Route  path="/editnames" element={<EditNames />}></Route>
            </Routes>
            
        </>
    );
}
export default Names;