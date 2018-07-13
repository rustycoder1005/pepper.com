var express = require('express');
var router = express.Router();


var User = require('../models/cont');

// Contact
router.get('/contact', function (req, res) {
	res.render('contact');
});


// Contact us
router.post('/contact', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
    var country = req.body.country;
    var phone = req.body.phone;
    var message = req.body.message;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('phone', 'Phoneno is required').notEmpty();
	req.checkBody('country', 'Country is required').notEmpty();
	req.checkBody('message', 'Message is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('contact', {                    //dont forget to put in contact.handlebars
			errors: errors
		});
	}
	
				else {
					var newCont = new Cont({
						name: name,
						email: email,
						country: country,
                        phone: phone,
                        message: message
					});
					Cont.createCont(newCont, function (err, cont) {
						if (err) throw err;
						console.log(cont);
					});
         	req.flash('success_msg', 'your message has been submitted we will reply ASAP :-)');
					res.redirect('/contact');
				}

            });
module.exports = router;