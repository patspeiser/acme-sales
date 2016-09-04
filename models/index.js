var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.DATABASE_URL, { 
	logging: false
})

var SalesPeople = db.define('Sales_People', {
	name: Sequelize.STRING
},{
	instanceMethods: {
		hasRegion: function(regionId){
			var hasRegion = false;
			if (this.Sales_People_Regions){
				this.Sales_People_Regions.forEach( function(salesPersonRegion){
					if (regionId == salesPersonRegion.RegionId){
						hasRegion = true;
					};
				})
			}
			return hasRegion;
			}	
		}
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