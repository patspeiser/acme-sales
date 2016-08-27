var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.CONN, { 
	//logging: true
})

var SalesPerson = db.define('SalesPerson', {
	name: Sequelize.STRING
});

var Region = db.define('Region', {
	zipCode: Sequelize.STRING
});

var SalesPersonRegion = db.define('SalesPersonRegion',{})
/*
SalesPerson.hasMany(SalesPersonRegion);
Region.hasMany(SalesPersonRegion);
SalesPersonRegion.belongsTo(SalesPerson);
SalesPersonRegion.belongsTo(Region);
*/
module.exports = {
	SalesPerson: SalesPerson,
	Region: Region,
	SalesPersonRegion: SalesPersonRegion
}