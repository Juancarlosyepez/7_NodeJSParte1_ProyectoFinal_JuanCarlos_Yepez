var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prueba1',{useMongoClient:true} );
module.exports = mongoose;