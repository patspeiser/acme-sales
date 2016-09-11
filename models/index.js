var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.DATABASE_URL, { 
	logging: false
});

var SalesPeople = db.define('Sales_People', {
	name: Sequelize.STRING
},{
	instanceMethods: {
    //why not do something similar with Region, hasSalesPerson
		hasRegion: function(regionId){
			var hasRegion = false;
			if (this.Sales_People_Regions){
        this.Sales_People_Regions.forEach( function(salesPersonRegion){
          if (regionId == salesPersonRegion.RegionId){
            hasRegion = true;
          }
        });
      }
      return hasRegion;
		}	
  }
});

var Region = db.define('Region', {
	zipCode: Sequelize.STRING
});

var SalesPeopleRegion = db.define('Sales_People_Region',{});

SalesPeople.hasMany(SalesPeopleRegion);
Regions.hasMany(SalesPeopleRegion);
SalesPeopleRegion.belongsTo(Regions);
SalesPeopleRegion.belongsTo(SalesPeople);

module.exports = {
  sync: function(){
    return db.sync({ force: true });
  },
  models: {
    SalesPeople: SalesPeople,
    Region: Region,
    SalesPeopleRegion: SalesPeopleRegion
  }
};
