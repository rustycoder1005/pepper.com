var express = require('express');
var router = express.Router();
var order = require('../models/order.js');

//Order
router.get('/odrs',ensureAuthenticated, function(req,res){
    res.render('order');
});

//Indian
router.get('/indian',ensureAuthenticated, function(req,res){
    res.render('indian');
});

//American
router.get('/american',ensureAuthenticated, function(req,res){
    res.render('american');
});

//CHinese
router.get('/chinese',ensureAuthenticated, function(req,res){
    res.render('chinese');
});

//Italian
router.get('/italian', ensureAuthenticated,  function(req,res){
    res.render('italian');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}          

//indian post
router.post('/indian', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var dish = req.body.dish;
    var phone = req.body.phone;
    var add = req.body.add;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('dish', 'order dish is required').notEmpty();
	req.checkBody('add', 'Your address is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('indian', {                    //dont forget to put in contact.handlebars
			errors: errors
		});
	}
	
				else {
					var neworder = new order({
						name: name,
						email: email,
						add: add,
                        phone: phone,
                        dish: dish
					});
					//console.log("user model is : ",ContModel);
					order.createorder(neworder, function (err, order) {
						if (err) throw err;
						console.log(order);
					});
         	req.flash('success_msg', 'Thank you for your order. Your food will arrive at your place soon.');
					res.redirect('odrs');
				}
			});
			






//italian post
router.post('/italian', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var dish = req.body.dish;
    var phone = req.body.phone;
    var add = req.body.add;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('dish', 'order dish is required').notEmpty();
	req.checkBody('add', 'Your address is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('italian', {                    
			errors: errors
		});
	}
	
				else {
					var neworder = new order({
						name: name,
						email: email,
						add: add,
                        phone: phone,
                        dish: dish
					});
					//console.log("user model is : ",ContModel);
					order.createorder(neworder, function (err, order) {
						if (err) throw err;
						console.log(order);
					});
         	req.flash('success_msg', 'Thank you for your order. Your food will arrive at your place soon.');
					res.redirect('odrs');
				}
			});
			





//chinese post
router.post('/chinese', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var dish = req.body.dish;
    var phone = req.body.phone;
    var add = req.body.add;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('dish', 'order dish is required').notEmpty();
	req.checkBody('add', 'Your address is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('chinese', {                    
			errors: errors
		});
	}
	
				else {
					var neworder = new order({
						name: name,
						email: email,
						add: add,
                        phone: phone,
                        dish: dish
					});
					//console.log("user model is : ",ContModel);
					order.createorder(neworder, function (err, order) {
						if (err) throw err;
						console.log(order);
					});
         	req.flash('success_msg', 'Thank you for your order. Your food will arrive at your place soon.');
					res.redirect('odrs');
				}
			});





//american post
router.post('/american', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var dish = req.body.dish;
    var phone = req.body.phone;
    var add = req.body.add;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('dish', 'order dish is required').notEmpty();
	req.checkBody('add', 'Your address is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('american', {                    
			errors: errors
		});
	}
	
				else {
					var neworder = new order({
						name: name,
						email: email,
						add: add,
                        phone: phone,
                        dish: dish
					});
					//console.log("user model is : ",ContModel);
					order.createorder(neworder, function (err, order) {
						if (err) throw err;
						console.log(order);
					});
         	req.flash('success_msg', 'Thank you for your order. Your food will arrive at your place soon.');
					res.redirect('odrs');
				}
			});
			


module.exports = router;