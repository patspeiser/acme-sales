var router = require('express').Router();
var chalk = require('chalk');
var _db = require('../models');
var Promise = require('bluebird');
var chalk = require('chalk');

module.exports = router;

router.post('/:salesPersonId/:regionId', function(req, res, next){
	console.log(chalk.green('adding user' + req.params.salesPersonId + ' to region ' + req.params.regionId))
	_db.SalesPeopleRegion.create({
		SalesPersonId: req.params.salesPersonId,
		RegionId: req.params.regionId
	})
	.then(function(){
		res.redirect('back');
	})
	.catch(next);
})

router.delete('/:salesPersonId/:regionId', function(req, res, next){
	console.log(chalk.green('deleting user' + req.params.salesPersonId + ' from region ' + req.params.regionId))
	_db.SalesPeopleRegion.destroy({
		where: {
			SalesPersonId: req.params.salesPersonId,
			RegionId: req.params.regionId 
		}
	})
	.then(function(){
		res.redirect('back');
	})
	.catch(next);
})
