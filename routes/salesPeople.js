var router = require('express').Router();
var chalk = require('chalk');
var _db = require('../models');
var Promise = require('bluebird');

module.exports = router;

router.get('/', function(req,res,next){
	/*_db.SalesPeople.findAll({
		include: [ {
			model: _db.SalesPeopleRegion,
			include: [ _db.Regions ]
		}]
	})
	.then(function(salesPeople){
		console.log(salesPeople);
		res.render('salesPeople', { salesPeople: salesPeople })
	})*/
	Promise.all([_db.SalesPeople.findAll({}), _db.Regions.findAll({})])	
	.spread(
		function( salesPeople, regions ) {
			res.render('salesPeople', { salesPeople: salesPeople, regions: regions })
		}
	)
	.catch(next)
	
})

router.post('/', function(req, res, next){
	console.log(chalk.green('CREATING USER: ', req.body.newSalesUser))
	_db.SalesPeople.create({
		name: req.body.newSalesUser
	})
	.then(function(){
		res.redirect('back')
	})
	.catch(next);
})

router.delete('/:id', function(req, res, next){
	console.log(chalk.green('DELETING USER w/ id: ' + req.params.id));
	_db.SalesPeople.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		console.log(chalk.green('SUCESSFULLY DELETED USER'));
		res.redirect('back');
	})

})