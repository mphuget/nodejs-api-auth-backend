//Express module is used to dispatch the incoming requests
//to the corresponding behaviours (controllers)
const express = require('express');

//Create an Express server
const app = express();

//Use the dotenv module to store specific configuration
require('dotenv').config()

//Restrict routes to only the homepage
app.get('/', (req, res) => {
  res.send(process.env.PROJECT);
});

//Start listening on a specific port
app.listen(process.env.PORT);

console.log('App server running on port ' + process.env.PORT);
