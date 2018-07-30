var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Rest = require('../models/resturant');
// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});

// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
					res.redirect('/users/login');
					req.flash('success_msg', 'You are registered and can now login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User, PLease register first to login' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Oops! wrong password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


//aboutus
router.get('/aboutus',ensureAuthenticated, function (req, res) {
	res.render('aboutus');
});

//privacy policy
router.get('/pp', ensureAuthenticated, function (req, res) {
	res.render('privacypol');
});

//terms and conditions
router.get('/t&c', ensureAuthenticated, function (req, res) {
	res.render('t&c');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}          


//register resturant

router.post('/resturant', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var country = req.body.country;
    var phone = req.body.phone;
    var type = req.body.type;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('country', 'Country is required').notEmpty();
	req.checkBody('type', 'Message is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('resturant', {                    //dont forget to put in contact.handlebars
			errors: errors
		});
	}
	
				else {
					var newRest = new Rest({
						name: name,
						email: email,
						country: country,
                        phone: phone,
                        type: type
					});
					//console.log("user model is : ",ContModel);
					Rest.createRest(newRest, function (err, rest) {
						if (err) throw err;
						console.log(rest);
					});
         	req.flash('success_msg', 'your message has been submitted we will reply ASAP :-)');
					res.redirect('/resturant');
				}
			});
			


module.exports = router;