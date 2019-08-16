const mongoose = require('mongoose');

const Personal = mongoose.Schema({
	firstname: String,
	lastname: String,
	phonenumber: Number,
	email: String,
	image: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Personal', Personal);