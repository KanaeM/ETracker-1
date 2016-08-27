var express = require ('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var models = require('./models');
var expresshb = require('express-handlebars');
var methodOver = require('method-override');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static(__dirname + '/public'));
app.use(methodOver('_method'));
app.engine('handlebars', expresshb({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var sequelizeConnection = models.sequelize
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
	return sequelizeConnection.sync({force:false})
})



//CREATE A NEW USER FOR THE SITE
// app.post('/create', function(req, res){
// 	return models.Employee.create({
// 		name: req.body.name,
// 		dob req.body.dob,
//		type: req.body.type,
// 		completed: false
// 	})
// 	.then(function(newEmployee){
// 		return models.Department.findOne({where: {name:req.body.depName}})
// 		.then(function(employee){
// 			return employee.addEmployee(newEmployee)
// 		})
//	res.redirect('/');
// 	})
//
// })


//GET ALL EMPLOYEES FROM ALL DEPARTMENTS
// app.get('/', function(req, res){
	// var employeeData = [];
	// models.Employee.findAll()
	// 	.then(function(allEmp){
	// 		for (var i = 0; i < allEmp.length; i++){
	// 			console.log(allEmp[i].name, allEmp[i].dob)
	// 			employeeData.push({
	// 				name:allEmp[i].name, 
	// 				dob:allEmp[i].dob,
	// 				department: allEmp[i].DepartmentId
	// 				})

	// 			}

	// 		console.log(employeeData)
	// 	})

	// res.render('index', employeeData)
// })


//GET EMPLOYEE TRAININGS
// models.Employee.findOne({where: {name: "David Bermudez"}})
// .then (function(emptraining){
// 	return emptraining.getTrainings()
// 	.then (function (training){
// 		console.log(training)
// 	})
// })


// models.Training.findOne({where: {name: "Finance Training"}})
// .then (function(finTraining){
// 	return finTraining.getEmployees()
// 	.then (function (train){
// 		console.log(train)
// 	})
// })

//PENDING TRAINING



// //GET EMPLOYEE DEPARTMENT THROUGH TRAININGS
// models.Training.findOne({where: {name: "Finance Training"}})
// .then (function(finTraining){
// 	return finTraining.getEmployees()
// 	.then (function (train){
// 		return train[0].DepartmentId
// 	})
// })
// .then (function(result){
// 	console.log("this is the result", result)
// 	models.Employee.findOne({where: {DepartmentId: result}})
// 	.then(function(dep){
// 		return dep.getDepartment()
// 		.then(function(final){
// 			console.log(final)
// 		})
// 	})
// 	})
	
// //
// //GET EMPLOYEES FROM A SPECIFIC DEPARTMENT
// models.Employee.findOne({where: { DepartmentId: 1}})
// 	.then(function(data){
// 		return data.getDepartment()
// 		.then(function(res){
// 			console.log(res)
// 		})
// 	})

//To create users 


//To get all users from 




var PORT = 3000;
app.listen(process.env.PORT || PORT, function(){
	console.log('Connected and listening on', PORT)
})
