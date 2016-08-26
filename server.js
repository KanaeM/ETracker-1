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
	return sequelizeConnection.sync({force:true})
});


var PORT = 3000;
app.listen(process.env.PORT || PORT, function(){
	console.log('Connected and listening on', PORT)
})
