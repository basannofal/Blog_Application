const express = require('express')
const app = express()
// blog post routes
const router = require('./Controllers/Blog/BlogPost');
const conn = require('./db/conn')
const cors = require('cors')
// blog category routes
const blogCategory_route = require('./Routes/Blog/BlogCategory');
const dashboard_routes = require('./Routes/Dashboard/Dashboard');
const namescategory_routes = require('./Routes/Names/Namescategory');
const names_routes = require('./Routes/Names/Names');
// const blogPost_route = require('./Routes/Blog/BlogPost');

// Middlewares
app.use(express.json())
app.use(cors())

// blog post routes
app.use(router);

// blog category routes
app.use('/', blogCategory_route);

// dashboard routes
app.use('/', dashboard_routes)

// Names categoty routes
app.use('/', namescategory_routes)

// Names routes
app.use('/', names_routes)

// app.use('/', blogPost_route);

app.listen(8000, () => {
    console.log('SERVER CREATED');
})