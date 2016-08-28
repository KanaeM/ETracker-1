ETracker
router.get('/api', authorized, function(req, res) {
router.get('/api/employee/', authorized, function(req, res) {
router.get('/api/employee/:id', authorized, function(req, res) {
router.get('/api/employee/:id/training', authorized, function(req, res) {
router.get('/api/department', authorized, function(req, res) {
router.get('/api/department/:name', authorized, function(req, res) {
router.get('/api/department/:name/training', authorized, function(req, res) {
router.get('/api/training', authorized, function(req, res) {
router.get('/api/training/:name/department', authorized, function(req, res) {
router.get('/api/training/:name/employee', authorized, function(req, res) {

CREATE A NEW USER FOR THE SITE
 app.post('/create', function(req, res){
 	return models.Employee.create({
 		name: req.body.name,
 		dob req.body.dob,
		type: req.body.type,
 		completed: false
 	})
 	.then(function(newEmployee){
 		return models.Department.findOne({where: {name:req.body.depName}})
 		.then(function(employee){
 			return employee.addEmployee(newEmployee)
 		})
	res.redirect('/');
 	})

 })


GET ALL EMPLOYEES FROM ALL DEPARTMENTS
 app.get('/', function(req, res){
	 var employeeData = [];
	 models.Employee.findAll()
	 	.then(function(allEmp){
	 		for (var i = 0; i < allEmp.length; i++){
	 			console.log(allEmp[i].name, allEmp[i].dob)
	 			employeeData.push({
	 				name:allEmp[i].name, 
	 				dob:allEmp[i].dob,
	 				department: allEmp[i].DepartmentId
	 				})

	 			}

	 		console.log(employeeData)
	 	})

	 res.render('index', employeeData)
 })


GET EMPLOYEE TRAININGS
 models.Employee.findOne({where: {name: "David Bermudez"}})
 .then (function(emptraining){
 	return emptraining.getTrainings()
 	.then (function (training){
 		console.log(training)
 	})
 })


 models.Training.findOne({where: {name: "Finance Training"}})
 .then (function(finTraining){
 	return finTraining.getEmployees()
 	.then (function (train){
 		console.log(train)
 	})
 })

PENDING TRAINING



 GET EMPLOYEE DEPARTMENT THROUGH TRAININGS
 models.Training.findOne({where: {name: "Finance Training"}})
 .then (function(finTraining){
 	return finTraining.getEmployees()
 	.then (function (train){
 		return train[0].DepartmentId
 	})
 })
 .then (function(result){
 	console.log("this is the result", result)
 	models.Employee.findOne({where: {DepartmentId: result}})
 	.then(function(dep){
 		return dep.getDepartment()
 		.then(function(final){
 			console.log(final)
 		})
 	})
 	})
	
 
 GET EMPLOYEES FROM A SPECIFIC DEPARTMENT
 models.Employee.findOne({where: { DepartmentId: 1}})
 	.then(function(data){
 		return data.getDepartment()
 		.then(function(res){
 			console.log(res)
 		})
 	})

To create users 


To get all users from 
