const router = require('express').Router();
const controller = require("../controllers/user");
const passport = require("passport");

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
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {

	controller.profile(req, res);

});


module.exports = router;
