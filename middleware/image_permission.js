 var usuario = require('../controllers/usuario');
 var Imagen = require('../models/imagenes');


 module.exports=function(imagen,req,res){

 	res.locals.imagen = imagen;
 	res.locals.user = req.user;


 	if (req.method == "GET" && req.path.indexOf("edit")<0){
 		return true;
 	}

 	if(imagen.creator._id.toString() == res.locals.user._id){

 		console.log("ID CREATOR: "+imagen.creator._id.toString());
 		console.log("ID USUARIO: "+res.locals.user._id);
 		return true;
 	}

 	if(typeof imagen.creator._id == "undefined") return false;
 		console.log("ID CREATOR: "+imagen.creator._id.toString());
 	return false;

 }

