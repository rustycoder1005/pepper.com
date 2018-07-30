var mongoose = require('mongoose');
// order schemae
var orderSchema = mongoose.Schema({
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
	dish: {
		type: String
    },
    add: {
		type: String
	}
});

var order = module.exports = mongoose.model('order', orderSchema);
module.exports.createorder = function(neworder, callback){
 
	        neworder.save(callback);
	    };
	
