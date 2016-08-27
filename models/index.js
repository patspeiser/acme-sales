var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.CONN, { 
	logging: false
})

var SalesPeople = db.define('Sales_People', {
	name: Sequelize.STRING
});

var Region = db.define('Region', {
	zipCode: Sequelize.STRING
});

var SalesPeopleRegion = db.define('Sales_People_Region',{})

SalesPeople.hasMany(SalesPeopleRegion);
Region.hasMany(SalesPeopleRegion);
SalesPeopleRegion.belongsTo(SalesPeople);
SalesPeopleRegion.belongsTo(Region);

module.exports = {
	SalesPeople: SalesPeople,
	Region: Region,
	SalesPeopleRegion: SalesPeopleRegion
}