var router = require('express').Router();
var chalk = require('chalk');
var _db = require('../models');
var Promise = require('bluebird');

module.exports = router;

router.post('/:salesPersonId/:regionId', function(req, res, next){
	_db.SalesPeopleRegion.create({
		salesPersonId: req.params.salesPersonId,
		regionId: req.params.regionId
	})
	.then(function(){
		res.redirect('back');
	})
	.catch(next);
})

router.delete('/:salesPersonId/:regionId', function(req, res, next){
	_db.SalesPeopleRegion.destroy({
		where: {
			salesPersonId: req.params.salesPersonId,
			regionId: req.parans.regionId 
		}
	})
	.then(function(){
		res.redirect('back');
	})
})