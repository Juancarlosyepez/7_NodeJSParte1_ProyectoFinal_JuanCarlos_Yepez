var models = require('./models'),
 Schema = models.Schema;

var img_schema = new Schema({
	titulo:{type:String, required:true},
	creator:{type: Schema.Types.ObjectId, ref: "Usuario"},
	extension:{type:String, required:true}
});

var Imagen = models.model("Imagen", img_schema,'imagen_sesion');

module.exports = Imagen;