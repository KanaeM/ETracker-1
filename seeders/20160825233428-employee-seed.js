'use strict';
// var models = require('./models');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Employees', [
      {id:1, name:"David Bermudez", dob: new Date(), completed:0, password: "hello", DepartmentId:1, createdAt: new Date(), updatedAt: new Date()},
      {id:2, name: 'Elsa Matsui', dob: "1987-07-12", completed:false, password: "kryptonite", DepartmentId:4, createdAt: new Date(), updatedAt: new Date()},
      {id:3, name: 'Gary Jackson', dob: "1966-01-15", completed:false, password: "goodbye", DepartmentId:1, createdAt: new Date(), updatedAt: new Date()},
      {id:4, name: 'Brian Yaringano', dob: "1996-05-30", completed:false, password: "password", DepartmentId:2, createdAt: new Date(), updatedAt: new Date()},
      {id:5, name: 'Robin Van Persie', dob: "1975-01-03", completed:false, password: "delete", DepartmentId:5, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },


  down: function (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Employees', null, {});
  }
};

// node server.js
// sequelize db:seed:all