var express = require('express');
var app = express();
var swig = require('swig');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//export app to mount on server
module.exports = app;

//routing file set up
var salesPeople = require('./routes/salesPeople.js');
var regions = require('./routes/regions.js');
var salesPersonRegions = require('./routes/salesPersonRegions');

//break cache on swig
swig.setDefaults({ cache: false});

//set up view engine
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

//some other setups... static files, body parsing, method overriding
app.use(express.static(__dirname + '/node_modules/'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'));

//default route
app.get('/', function(req, res, next){
	console.log(chalk.magenta(req.url));
	res.render('index');
})

//when hitting /salesPeople send to the router
app.use('/salesPeople', salesPeople);

//when hitting /regions send to that router
app.use('/regions', regions);

//when we delete or create add a user to region or region to user
app.use('/salesPersonRegions', salesPersonRegions)


