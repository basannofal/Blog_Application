import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './Assets/css/App.css'
import './Assets/css/Sidebar.css'
import App from './Routes/App';
import Blog from './Routes/Blog';
import Names from './Routes/Names';
import Books from './Routes/Books';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Blog />
    <Names />
    <Books />
  </BrowserRouter>,
  document.getElementById("root"))