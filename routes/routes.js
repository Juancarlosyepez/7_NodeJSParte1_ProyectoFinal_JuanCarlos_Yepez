var usuario = require('../controllers/usuario');
 var Imagen = require('../models/imagenes');
 var owner_check = require('../middleware/image_permission');
 var multer = require('multer');
 var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null, './public/imagenes/temp')
	},
	filename:function(req,file,cb){
		cb(null,Date.now()+'-'+file.originalname)
	}
});
var upload = multer({storage});
var fs = require('fs');


var rutas = function(app){

	app.get('/registro', function(req, res){
		res.render('registro');
	});

	app.post('/registro', usuario.registro, function(req, res){
		res.redirect('/login');
	});

	app.get('/', function(req, res){
		title='Imagen Editor';
		res.render('index');
		
	});

	app.get('/login', function(req, res){
		let error_message = req.flash('error')[0];
		res.locals.error_message = error_message;
		title='Login Page';
		res.render('login');

	});

	app.get('/user', function(req, res){
		console.log(req.user);
		console.log("ENTRÉ A HOME");
		res.locals.user = req.user;
		title='Welcome!!';

		console.log("PARAMETRO ID DE IMAGEN "+req.params.id)
			Imagen.find({})
			  .populate("creator")
			  .exec(function(err,imagenes){
			  	var tipo=typeof(imagenes.creator);
			  	console.log("tipo de variable---"+tipo);
			  	if(err)console.log(err);
			  	res.render('home',{imagenes:imagenes});
			  });
	});

	app.get('/salir', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/error', function(req, res){
		//res.send(req.session.flash.error[0]);
		mensaje="No tiene permiso para editar las imagenes";
		res.render('error')

	});

	
//----------------------CREATE------------------------------------------------------------

	app.get('/new', function(req,res){
		title='Upload Page';
			res.render('new');

		});
	
	app.post('/new', upload.single('archivo'),function(req, res,next){
		var extension = req.file.filename.split(".").pop();
		console.log("PRUEBA DE PASO: "+req.file.path);
			var imagen = new Imagen({
			titulo: req.body.titulo,
			creator: req.user._id,
			extension: extension
			});
			
		imagen.save(function(err,imagen){
			if(!err){
				console.log("PATH " +req.file.path);
				fs.rename(req.file.path, "./public/imagenes/temp"+imagen._id+"."+extension)
				//res.redirect('/imagenes/'+imagen._id)	
				res.redirect('/gallery');
			}else{
				res.status(400);
				res.redirect('/user');
				//res.send('Ha ocurrido un proplema');
			}
		});
	});
//-------------consulta de la imagen subida que se muestra en la plantilla show----
	app.get('/imagenes/:id', function(req,res){
		res.locals.user=req.user;
		console.log("PARAMETRO ID DE IMAGEN "+req.params.id)
		Imagen.findById(req.params.id)
			  .populate("creator")
			  .exec(function(err,imagen){
			console.log("id y usuario del schema Usuario "+req.user._id+req.user.usuario);
			console.log('ENLACE DE PARAMETROS del schema Imagen y Usuario='+imagen)
			console.log("CREADOR DE LA IMAGEN="+imagen.creator+" PASSWORD="+imagen.creator.password+" TITULO EL ARCHIVO="+imagen.titulo);
			res.render('show',{imagen:imagen});
		})	
	});

	app.get('/gallery', function(req,res){
		title='Gallery Page';
		Imagen.find({creator: req.user._id},function(err,imagenes){
			if(err){
				res.redirect('home');
				return
			}
			res.render('gallery',{imagenes:imagenes});
		});
	});

//----------------------EDIT---------------------------------------------------------------
	app.get('/edit/:id', function(req,res){
		title='Edit Image  ';
		Imagen.findById(req.params.id,function(err,imagen){
			if(owner_check(imagen,req,res)==true){
				res.render('edit',{imagen:imagen});
			}else{
				res.status(400);
				//res.send('No tiene permiso para acceder a las imagenes');
				res.redirect('/error');
			}	
		});
	});

	app.put('/edit/:id', function(req, res){
			Imagen.findById(req.params.id,function(err,imagen){
			imagen.titulo=req.body.titulo;
			imagen.save(function(err,imagen){
				if(!err){
					//console.log('PARAMETROS REQUERIDOS POR ID='+imagen);
					//res.redirect('/imagenes/'+imagen._id)	
					res.redirect('/gallery')
				}else{
					//res.status(400);
					res.render('edit',{imagen:imagen});
				}
			});
		});
	});

//-------------------------------DELETE-------------------------------------------------------------

	app.delete('/delete/:id', function(req,res){
		 id=req.params.id;
		Imagen.findOneAndRemove({_id:id},function(err){
			if(!err){
					res.redirect('/gallery');
				}else{
					res.status(400);
				}
		});
	});


};

module.exports = rutas;