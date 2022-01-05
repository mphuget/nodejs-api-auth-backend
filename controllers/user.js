function signin(req, res) {

    res.send("Signin");

}

function signup(req, res) {

    res.send("Signup");

}

function signout(req, res) {

    res.send("Signout");

}

function profile(req, res) {

    res.send("Profile");
    
}

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.signout = signout;
module.exports.profile = profile;