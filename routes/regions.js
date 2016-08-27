var router = require('express').Router();
var chalk = require('chalk');
var _db = require('../models');
var Promise = require('bluebird');

module.exports = router;

router.get('/', function(req, res, next){
	console.log(chalk.magenta(req.originalUrl + req.url))
	Promise.all([ _db.Regions.findAll({}), _db.SalesPeople.findAll({}) ])
	.spread(function(regions, salesPeople){
		res.render('regions', {regions: regions, salesPeople: salesPeople})
	})
	.catch(next);

})

router.post('/', function(req,res,next){
	console.log(chalk.magenta('POST: ' + req.originalUrl + req.url))
	_db.Regions.create({
		zipCode: req.body.zipCode
	})
	.then(function(){
		res.redirect('back');
	})
	.catch(next)
})

router.delete('/:id', function(req, res, next){
	console.log(chalk.green('DELETING REGION w/ ID: ' + req.params.id));

	_db.Regions.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		console.log(chalk.green('REGION DELETED SUCCESSFULLY'))
		res.redirect('back');
	})
	.catch(next);
})