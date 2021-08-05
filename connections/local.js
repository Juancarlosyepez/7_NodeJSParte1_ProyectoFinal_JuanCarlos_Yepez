var passport = require('passport'),
passportLocal = require('passport-local'),
LocalStrategy = passportLocal.Strategy;

var Usuario = require('../models/usuario');

var localConnection = function(app){
	passport.use('user', new LocalStrategy({
		usernameField:'usuario',
		passwordField: 'password',
	},
	function(username, password, done){
		console.log(username);
		console.log(password);

		Usuario.findOne({usuario:username})
			.then(function(user){
				
				if (!user) return done(null, false, {message: `El username ${username} no existe!`});
				if (user.password === password) {
					return done(null, user);
				} else {
					return done(null, false, {message: 'El password es incorrecto'});
				}
		});
	}
	));

	app.post('/login', passport.authenticate('user',{
		successRedirect:'/user',
		failureRedirect:'/login',
		failureFlash: true,
	}));
		
	};

module.exports = localConnection;

