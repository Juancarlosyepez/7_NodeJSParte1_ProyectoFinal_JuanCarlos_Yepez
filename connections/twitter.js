var passport = require('passport'),
passportTwitter = require('passport-twitter'),
TwitterStrategy = passportTwitter.Strategy;

var Usuario = require('../models/usuario');

var twitterConnection = function(app){
	passport.use(
		new TwitterStrategy({
			consumerKey:'eVvgJOl8ZfWBVMmRwXWmXIDaH',
			consumerSecret:'4jbWL4W35VH7dPogO6hA3GwAsQFJw11t5qM2QIswBL0s3pvorG',
			callbackURL:'http://localhost:3000/auth/twitter/callback/'
		},
		function(token, tokenSecret, profile, done){
			Usuario.findOne({
				'twitter.id':profile.id
			},
			function(err, user){
				if(err){
					return done(err);
				}
				if(!user){
					var usuario = new Usuario({
						usuario: profile.username,
						twitter: profile
					});
					var datos = JSON.stringify(eval("("+profile._raw+")"));
					usuario.nombre = JSON.parse(datos).name;

					usuario.save(function(err, user){
						if(err){
							done(err, null);
							return;
						}
						done(null, user);
					});
				}else{
					return done(err, user);
				}
			}
			);
		}
		));

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback/', passport.authenticate('twitter', 
									{ successRedirect: '/user',
									  failureRedirect: '/login' }))
};

module.exports = twitterConnection;