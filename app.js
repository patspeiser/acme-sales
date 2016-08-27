var express = require('express');
var app = express();
var swig = require('swig');


//export app to mount on server
module.exports = app;

//routing file set up
var salesPeople = require('./routes/salesPeople.js');
var regions = require('./routes/regions.js');


//break cache on swig
swig.setDefaults({ cache: false});

//set up view engine
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

//static files
app.use(express.static(__dirname + '/node_modules/'));

//default route
app.get('/', function(req, res, next){
	res.render('index');
})


//when hitting /salesPeople send to the router
app.use('/salesPeople', salesPeople);

//when hitting /regions send to that router
app.use('/regions', regions);




