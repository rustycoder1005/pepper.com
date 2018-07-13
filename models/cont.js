var mongoose = require('mongoose');
// contact Schema
var ContSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	country: {
		type: String
    },
    message: {
		type: String
	}
});

var Cont = module.exports = mongoose.model('Cont', ContSchema);
module.exports.createCont = function(newCont, callback){
 
	        newCont.save(callback);
	    };
	
