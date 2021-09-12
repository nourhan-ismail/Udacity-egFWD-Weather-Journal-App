// Setup empty JS object to act as endpoint for all routes
projectData = {};

const port = 8888;

// Require Express to run server and routes
const express = require("express");

// Require Body-Parser to parse request object content
const bodyParser = require("body-parser");

// Require cors to solve cors issues
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () => {
  console.log("Listening to localhost:" + port);
});