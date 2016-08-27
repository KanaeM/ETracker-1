'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING, 
    dob: DataTypes.DATE,
    accountType: DataTypes, STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Employee.belongsTo(models.Department);
        Employee.belongsToMany(models.Training, {through: "EmployeeTraining"})
      }
    }
  });
  return Employee;
};