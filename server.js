//Express module is used to dispatch the incoming requests
//to the corresponding behaviours (controllers)
const express = require('express');

//Create an Express server
const app = express();

//To access form data
let bodyParser = require('body-parser');

//Used to reduce response body
let compression = require('compression');

//To access server directories
let path = require('path');

//CORS module allows to protect server from different attacks
let cors = require('cors');

//to access the database stored in MongoDB
let mongoose = require('mongoose');

//session allows to store data such as user data
let session = require('express-session');

//sessions are stored into MongoDB
let MongoStore = require('connect-mongo');

//Use the dotenv module to store specific configuration
require('dotenv').config()

//compress response body for better performance
app.use(compression());

//disable headers indicating pages are coming from an Express server
app.disable('x-powered-by');

//used to fetch the data from forms on HTTP POST
app.use(bodyParser.urlencoded({

  extended : true

}));

app.use(bodyParser.json());

//CORS in use
//imposed by server when both client and server are on the same domain
app.use(cors());

//Restrict routes to only the homepage
app.get('/', (req, res) => {
  res.send(process.env.PROJECT);
});

//connects to the MongoDB database
mongoose.connect(process.env.MONGODB_URL, (err)=> {

  if (err) {

    throw err;

  }
  else {

    console.log("Connected to the database");

  }

});

//setting session
app.use(session({

  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET_KEY,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL})

}));

//Access the routes
const userRoutes = require('./routes/user');

//Use the routes
app.use(userRoutes);

//Start listening on a specific port
app.listen(process.env.PORT);

console.log('App server running on port ' + process.env.PORT);
