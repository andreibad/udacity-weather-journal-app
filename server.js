const express = require('express');

// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// GET method route
app.get('/all', function (req, res) {
    console.log('get request');
    res.json(projectData);
  })
  
// POST method route
app.post('/add',  function(req, res) {
    console.log('post request')
    let newEntry = {
        temperature: req.body.temperature,
        date : req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.unshift(newEntry);
    res.json(projectData);
    console.log(projectData);
  })