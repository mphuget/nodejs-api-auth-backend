let router = require('express').Router();

//The signin route to log into the site
//unauthenticated route
router.post('/signin', (req, res) => {

  res.send("signin");

});

//The signout route to log out
//unauthenticated route
router.post('/signout', (req, res) => {

    res.send("signout");

});

//The signup route to create an account
//unauthenticated route
router.post('/signup', (req, res) => {

	res.send("signup");

});

//The profile route 
//authenticated route
router.get('/profile', (req, res) => {

	res.send("profile");

});


module.exports = router;
