var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.CONN, { 
	logging: false
})

var SalesPeople = db.define('Sales_People', {
	name: Sequelize.STRING
});

var Regions = db.define('Regions', {
	zipCode: Sequelize.STRING
});

var SalesPeopleRegion = db.define('Sales_People_Region',{})

SalesPeople.hasMany(SalesPeopleRegion);
Regions.hasMany(SalesPeopleRegion);
SalesPeopleRegion.belongsTo(Regions);
SalesPeopleRegion.belongsTo(SalesPeople);

module.exports = {
	SalesPeople: SalesPeople,
	Regions: Regions,
	SalesPeopleRegion: SalesPeopleRegion
}