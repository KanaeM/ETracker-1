'use strict';
module.exports = function(sequelize, DataTypes) {
  var Training = sequelize.define('Training', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Training.belongsToMany(models.Department, {through: 'DepartmentTraining'});
        
      }
    }
  });
  return Training;
};