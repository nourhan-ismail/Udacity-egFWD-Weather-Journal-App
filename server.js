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

/* 
Defining GET Routes
*/
app.get("/latest-entry", (req, res) => {
  // On GET request at /latest-entry, we respond with projectData object in JSON format.
  res.send(JSON.stringify(projectData));
});

/*
Defining POST Routes
*/
app.post("/latest-entry", (req, res) => {
  // On POST request at /latest-entry, we set the keys of the projectData object with the corresponding values in the request body.
  const { temp, date, feeling } = req.body;
  projectData.temp = temp;
  projectData.date = date;
  projectData.feeling = feeling;
  res.status(201).send("Data added successfully.");
});
