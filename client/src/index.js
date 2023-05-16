import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './Assets/css/App.css'
import './Assets/css/Sidebar.css'
import App from './Routes/App';
import Blog from './Routes/Blog';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Blog />
  </BrowserRouter>,
  document.getElementById("root"))