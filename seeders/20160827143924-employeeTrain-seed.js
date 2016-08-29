'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('EmployeeTraining', [
      {EmployeeId: 4, TrainingId:1, Completed:false, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('EmployeeTraining', null, {});
  }
};
