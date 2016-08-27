var http = require('http');
var server = http.createServer(require('./app'));
var chalk = require('chalk');

server.listen(process.env.PORT, function(){
	console.log(chalk.white.bgBlue.bold('listening on port... ' + process.env.PORT));
})