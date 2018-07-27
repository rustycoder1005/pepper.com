var express = require('express');
var router = express.Router();

//Order
router.get('/odrs',ensureAuthenticated, function(req,res){
    res.render('../views/orders/order');
});

//Indian
router.get('/indian',ensureAuthenticated, function(req,res){
    res.render('../views/orders/indian');
});

//American
router.get('/american',ensureAuthenticated, function(req,res){
    res.render('../views/orders/american');
});

//CHinese
router.get('/chinese',ensureAuthenticated, function(req,res){
    res.render('../views/orders/chinese');
});

//Italian
router.get('/italian', ensureAuthenticated,  function(req,res){
    res.render('../views/orders/italian');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}          


module.exports = router;
