'use strict';
module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Department.belongsToMany(models.Training, {through: 'DepartmentTraining'});
      }
    }
  });
  return Department;
};