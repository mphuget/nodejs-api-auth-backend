//Express module is used to dispatch the incoming requests
//to the corresponding behaviours (controllers)
const express = require('express');

//Create an Express server
const app = express();

//To access form data
const bodyParser = require('body-parser');

//Used to reduce response body
const compression = require('compression');

//To access server directories
const path = require('path');

//CORS module allows to protect server from different attacks
const cors = require('cors');

//Add helmet to protect the server
const helmet = require('helmet');

//to access the database stored in MongoDB
const mongoose = require('mongoose');

//session allows to store data such as user data
const session = require('express-session');

//sessions are stored into MongoDB
const MongoStore = require('connect-mongo');

//Add colour highlighting on console
const chalk = require('chalk');

//The 404 middleware used when an incoming request
//hits a wrong route
const http404 = require('./middleware/route404');

//Used for logging
const morgan = require("morgan");

//Add more logging with Winston
const {loggers, transports, format} = require("winston");

//Use the dotenv module to store specific configuration
require('dotenv').config()

//Used for Jsonwebtoken (in login)
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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

//Protect the server
app.use(helmet());

//Use the morgan logging 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//Define the loggers for Winston
loggers.add('infoLogger', {
  level: 'info',
  transports: [new transports.File({ filename: path.join(__dirname, 'logs/info.log')})],
  format: format.printf((info) => {
    let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
    return message
  })
});

loggers.add('errorLogger', {
  level: 'error',
  transports: [new transports.File({ filename: path.join(__dirname, 'logs/error.log')})],
  format: format.printf((info) => {
    let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
    return message
  })
});

const infoLogger = loggers.get('infoLogger');

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

    console.log(chalk.green("Connected to the database"));

  }

});

//setting session
app.use(session({

  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET_KEY,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL})

}));

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY_JWT;

const User = require('./models/user');

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }, (err) => {
      return done(err, false);
    });
}));

app.use(passport.initialize());

//Access the routes
const userRoutes = require('./routes/user');

//Use the routes
app.use(userRoutes);

//When there is no route that caught the incoming request
//use the 404 middleware
app.use(http404.notFound);

//Start listening on a specific port
app.listen(process.env.PORT);

console.log(chalk.green('App server running on port ' + process.env.PORT));
