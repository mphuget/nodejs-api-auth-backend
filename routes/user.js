let router = require('express').Router();
let controller = require("../controllers/user");

//The signin route to log into the site
//unauthenticated route
router.post('/signin', (req, res) => {

  controller.signin(req, res);

});

//The signout route to log out
//unauthenticated route
router.post('/signout', (req, res) => {

  controller.signout(req, res);

});

//The signup route to create an account
//unauthenticated route
router.post('/signup', (req, res) => {

	controller.signup(req, res);

});

//The profile route 
//authenticated route
router.get('/profile', (req, res) => {

	controller.profile(req, res);

});


module.exports = router;
