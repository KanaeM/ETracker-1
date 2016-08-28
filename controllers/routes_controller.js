var chalk = require('chalk');
var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', function(req, res) {
	res.render('login');
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
	// seems to be a passport bug sending the redirect before the session is saved?
	// https://github.com/expressjs/session/issues/309
	req.session.save(function () {
			res.redirect('/api');
		});
});

function authorized(req, res, next) {
		if (req.user) {
				next();
		} else {
				console.log(chalk.black.bgYellow('== Unauthorize User ===='));
				res.redirect('/');
		}
};
// Associations 
//http://stackoverflow.com/questions/22958683/how-to-implement-many-to-many-association-in-sequelize

router.get('/api', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api'));
	res.render('api')
});

// All api routes need to be changed to ==>  res.json(data)    important !!!!

router.get('/api/employee/', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/employee'));
	models.Employee.findAll({})
		.then(function(employees) {
			res.render('apiinfo', {data: employees});
		})
});

router.get('/api/employee/:id', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/employee/' + req.params.id));
	models.Employee.findOne({where : { id : req.params.id }})
		.then(function(employee) {
			res.render('apiinfo', {data: employee});
		})
});

router.get('/api/employee/:id/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/employee/' + req.params.id + '/training'));
	models.Employee.findOne({where : { id : req.params.id }})
		.then(function(employee) {
			return employee.getTrainings()
		})
		.then(function(training) {
			console.log(training);
			res.render('apiinfo', {data : training})
		});
});

router.get('/api/department', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/department'));
	models.Department.findAll({})
		.then(function(data) {
			res.render('apiinfo', {data: data});
		})
});

router.get('/api/department/:name', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/deparment/' + req.params.name));
	models.Department.findOne({where : { name : req.params.name }})
		.then(function(department) {
			return department.getEmployees()
		})
		.then(function(employees) {
			console.log(employees);
			res.render('apiinfo', {data : employees})
		});
});

router.get('/api/department/:name/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/department/' + req.params.name + '/training'));
	models.Department.findOne({where : { name : req.params.name }})
		.then(function(department) {
			return department.getTrainings()
		})
		.then(function(training) {
			console.log(training);
			res.render('apiinfo', {data : training})
		});
});

router.get('/api/training', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/training'));
	models.Training.findAll({})
		.then(function(data) {
			res.render('apiinfo', {data: data});
		})
});

router.get('/api/training/:name/department', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/training/' + req.params.name + '/department'));
	models.Training.findOne({where : { name : req.params.name }})
		.then(function(training) {
			return training.getDepartments()
		})
		.then(function(departments) {
			console.log(departments);
			res.render('apiinfo', {data : departments})
		});
});

router.get('/api/training/:name/employee', authorized, function(req, res) {
	console.log(chalk.black.bgYellow('GET /api/training/' + req.params.name + '/employee'));
	models.Training.findOne({where : { name : req.params.name }})
		.then(function(training) {
			return training.getEmployees()
		})
		.then(function(employees) {
			console.log(employees);
			res.render('apiinfo', {data : employees})
		});
});

module.exports = router;