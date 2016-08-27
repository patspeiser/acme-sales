var http = require('http');
var server = http.createServer(require('./app'));
var chalk = require('chalk');
var _db = require('./models');
var Promise = require('bluebird');


// Getting exported from ./models/index
/*
	module.exports = {
		SalesPerson: SalesPerson,
		Region: Region,
		SalesPersonRegion: SalesPersonRegion
	}
*/
console.log(_db.SalesPerson);
//start server
Promise.all([_db.SalesPerson.sync({force: true}), _db.Region.sync({force: true}), _db.SalesPersonRegion.sync({force: true})])
.then( 
	function(success){
		server.listen(process.env.PORT, function(){
			console.log(chalk.white.bgBlue.bold('listening on port... ' + process.env.port));
		})
	},
	function(failure){
		console.log(failure);
})

