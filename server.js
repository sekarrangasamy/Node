var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multiparty = require('connect-multiparty');
var resourceService = require('./resource.js');
const path = require('path');
const port = process.env.PORT || 3000;
var app = express();
var Personal = require('./personal.js');
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
var imgName;

// connection for Database
mongoose.connect('mongodb://192.168.2.30/sekar-test', {
	useNewUrlParser: true
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log('Could not connect to the database. Exiting now...');
	process.exit();
});

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var multipartMiddleware = multiparty({
	uploadDir: './images'
});

app.post('/personal',multipartMiddleware,(req, res) => {
	console.log("req",req.body);
	var getInfo = {};
		getInfo.firstname = req.body.firstname,
		getInfo.lastname = req.body.lastname,
		getInfo.phonenumber = req.body.phonenumber,
		getInfo.email = req.body.email,
		getInfo.image = req.body.image
		console.log("req.file",req.body.image);
		// imgName = path.parse(req.files.image.path);
		// var ext = imgName.ext;
		// if (!ext || ext.match(/\.(jpg|jpeg|png)$/i)) {
		// 		resourceService.move(req.files, 'images').then(path => {
		// 			getInfo.image = path;
		// 				Personal.create(getInfo).then((data) => {
		// 				res.send(data);
		// 				console.log("res",data);
		// 			}).catch((err) => {
		// 				res.send(err)
		// 			})
		// 		})
		// }

			Personal.create(getInfo).then((data) => {
						res.send(data);
						console.log("res",data);
					}).catch((err) => {
						res.send(err)
					})

});


app.put('/personal/:id', (req, res) => {
	var getInfo = {};
		getInfo.firstname = req.body.firstname,
		getInfo.lastname = req.body.lastname,
		getInfo.phonenumber = req.body.phonenumber,
		getInfo.email = req.body.email,
		getInfo.image = req.body.image

		Personal.update({
		_id: req.params.id
	}, getInfo).then((data) => {
						res.send(data);
						console.log("res",data);
					}).catch((err) => {
						res.send(err)
			})
});

app.get('/personal', (req,res,next)=>{
	var query = {};
	Personal.find(query).then((data) => {
		res.send(data);
	}).catch((err) => {
		res.send(err)
	})
})


app.get('/personalist/:id', (req, res) => {
	Personal.findById(req.params.id).then((data) => {
		res.send(data);
	}).catch((err) => {
		res.send(err)
	})
});

app.delete('/personalist/:id', (req, res) => {
	Personal.findByIdAndRemove(req.params.id).then((data) => {
		res.send(data);
	}).catch((err) => {
		res.send(err)
	})
});



app.listen(port, () => {
	console.log("Server is listening on port " + port);
});