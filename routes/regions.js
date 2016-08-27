var router = require('express').Router();
var chalk = require('chalk');

module.exports = router;

router.get('/', function(req, res, next){
	console.log(chalk.magenta('at /regions'))
	res.render('regions');
})