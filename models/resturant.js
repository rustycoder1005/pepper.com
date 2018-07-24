var mongoose = require('mongoose');
// resturant Schema
var RestSchema = mongoose.Schema({
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
    type: {
		type: String
	}
});

var Rest = module.exports = mongoose.model('Rest', RestSchema);
module.exports.createRest = function(newRest, callback){
 
	        newRest.save(callback);
	    };
	
