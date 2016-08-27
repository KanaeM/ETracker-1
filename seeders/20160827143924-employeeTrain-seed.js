'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('EmployeeTraining', [
      {EmployeeId: 1, TrainingId:3, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },


  down: function (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('EmployeeTraining', null, {});
  }
};
