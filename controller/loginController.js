var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');

var routes = require('./controllers/jade_controller.js');

var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var LocalStrategy = require('passport-local').Strategy;

var db = require('./models/index.js').sequelize;
var Employee = require('./models').employee;

db.sync();

var app = express();

app.use(express.static(process.cwd() + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  store: new SequelizeStore({
    db: db
  }),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(function(username, password, done) {
	Employee.findOne({where:{username: username}}).then(function(employee) {
		if(!employee){
			return done(null, false);
		}
		var realPass = employee.password;
		if (!employee.username){
			return done(null, false);
		}
		if (password !== realPass){
			return done(null, false);
		}

		return done(null, employee);
	}).catch(function(err){
		throw err;
	});
}));

passport.serializeUser(function(employee, cb) {
  cb(null, employee.id);
});

passport.deserializeUser(function(id, cb) {
  Employee.findOne( {where: {id: id} }).then(function(employee) {
    cb(null, employee);
  }).catch(function(err) {
    if (err) {
      return cb(err);
    }
  });
});

app.use('/', routes);

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
	// seems to be a passport bug sending the redirect before the session is saved?
	// https://github.com/expressjs/session/issues/309
	req.session.save(function () {
      res.redirect('/');
    });
});

app.listen(3000);
