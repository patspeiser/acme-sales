// don't forget semi-colons- use a linter
var router = require('express').Router();
var chalk = require('chalk');
var _db = require('../models');
var Promise = require('bluebird');
var models = _db.models;
var Region = models.Region;
var SalesPerson = models.SalesPerson;
var SalesPersonRegion = models.SalesPersonRegion;


module.exports = router;

router.get('/', function(req, res, next){
	console.log(chalk.magenta('GET', req.originalUrl + req.url));
	Promise.all([ 
		Regions.findAll({}),//I would rather you included in the Region 
		SalesPeople.findAll({
			include: [ {
				model: _db.SalesPeopleRegion,
				include: [ _db.Regions ]
			}]
		})
	])
	.spread(function(regions, salesPeople){
		res.render('regions', { salesPeople: salesPeople, regions: regions })
	})
	.catch(next);
});

router.post('/', function(req,res,next){
	console.log(chalk.magenta('POST: ' + req.originalUrl + req.url));
	_db.Regions.create({
		zipCode: req.body.zipCode
	})
	.then(function(){
		res.redirect('back');//might be fine.. just not sure about it
	})
	.catch(next);
});

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
});
