var http = require('http');
var server = http.createServer(require('./app'));
var chalk = require('chalk');
var _db = require('./models');
var Promise = require('bluebird');

//start server
//just use _db.sync-- you don't need to sync each model
if(process.env.SYNC){
  require('../db').sync();
}

server.listen(process.env.PORT, function(){
  console.log(chalk.white.bgBlue.bold('listening on port... ' + process.env.PORT));
});

  /*
Promise.all([_db.SalesPeople.sync({force: true}), _db.Regions.sync({force: true})])
.then(
	function(success){
		_db.SalesPeopleRegion.sync({force: true})
		.then(
			function(success){
      */
/*
			},
			function(failure){
				console.log(chalk.red(failure))
			})
}, 
	function(failure){
		console.log(chalk.red(failure))
	}
).catch();
*/


