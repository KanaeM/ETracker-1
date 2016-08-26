'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    password: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Employee.belongsTo(models.Department);
      }
    }
  });
  return Employee;
};