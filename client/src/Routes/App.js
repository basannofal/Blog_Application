import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard';

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Dashboard />}></Route>
            </Routes>

        </>
    );
}
export default App;