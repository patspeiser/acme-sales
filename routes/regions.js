var router = require('express').Router();
var chalk = require('chalk');
var _db = require('../models');
var Promise = require('bluebird');

module.exports = router;

router.get('/', function(req, res, next){
	console.log(chalk.green(req.originalUrl + req.url ))
	/*_db.Regions.findAll({
		include: [ {
			model: _db.SalesPeopleRegion,
			include: [ _db.SalesPeople ]
		}]
	})
	.then(function(regions){
		res.render('regions', { regions: regions })
	})
	*/

	Promise.all([_db.SalesPeople.findAll({}), _db.Regions.findAll({})])	
	.spread(
		function( salesPeople, regions ) {
			res.render('regions', { salesPeople: salesPeople, regions: regions })
		}
	)
	.catch(next)
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