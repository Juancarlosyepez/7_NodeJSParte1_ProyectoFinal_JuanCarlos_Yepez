var passport = require ('passport'),
	facebookStrategy = require('passport-facebook');

var Usuario = require('../models/usuario');

var facebookConnection = function(app){

	passport.use(new facebookStrategy({
		clientID:'490165031467569',
		clientSecret:'c3ef18c6ea20e8b7d801c30128e4ec59',
		callbackURL:'http://localhost:3000/auth/facebook/callback/'
	},
	function (accessToken, refreshToken, profile, done){
		
		let username = profile._json.name.split(' ').join('.');
		console.log("nombre de usuario de facebook"+username);
		Usuario.findOne({'facebook.id': profile._json.id})
		.then(function (user) {
				if (user) {
					return done(null, user);
				} else {
					let new_user = new Usuario({
						usuario: username,
						'facebook.id': profile._json.id
					});
					new_user.save(function (err){
						if (!err) return done(null, new_user);
					});
				}
			});
	}
));

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback/', passport.authenticate('facebook', 
									{ successRedirect: '/user',
									  failureRedirect: '/login' }))

};

module.exports= facebookConnection;