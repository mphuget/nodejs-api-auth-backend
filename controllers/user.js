const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign({id: user.id, username: user.username}, process.env.SECRET_KEY_JWT);
}

function signin(req, res) {

    let User = require('../models/user');

    //search for the User
	User.findOne({username: req.body.name}, function(err, user) {
		if (err)
			throw err;

		if (user.comparePassword(req.body.password)) {

            req.session.username = req.body.name;
			req.session.logged = true;
            res.status(200).json({token: createToken(user)});
		}
		else
			res.redirect('/');
	});

}

function signup(req, res) {

    //create a new User
    let User = require('../models/user');
	let user = new User();

    //add the date
	user.username = req.body.name;
	user.password = req.body.password;

    //save it in MongoDB
	user.save((err, savedUser) => {

		if (err)
			throw err;

        //return to the homepage
		res.redirect('/');

	});

}

function signout(req, res) {

    req.session.username = "";
	req.session.logged = false;
    res.redirect("/");

}

function profile(req, res) {

    if (req.session.logged)
        res.send("Profile");
    else
        res.redirect('/');

    
}

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.signout = signout;
module.exports.profile = profile;