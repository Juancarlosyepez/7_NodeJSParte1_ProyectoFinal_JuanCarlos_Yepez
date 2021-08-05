var express = require('express'),
app = express(),
server = require('http').createServer(app);

var io = require('socket.io')(server);
var redis = require('redis');
var client = redis.createClient();

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser =  require('body-parser');
var path = require('path');
var swig = require('swig');
//midleware para implementar atributos de html y metodos del http que no implementa el navegador
var methodOverride = require('method-override');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname+'/views');
 
 

app.set('view cache', false);
swig.setDefaults({cache: false});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use(session({
	store: new RedisStore({}),
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(methodOverride('_method'));

passport.serializeUser(function (user, done){
	console.log("Serialize: "+user);
	done(null, user);
});

passport.deserializeUser(function (obj, done){
	console.log("Deserialize: "+obj);
	done(null, obj);
});

 require('./routes/routes')(app);


 require('./connections/local')(app);


 require('./connections/twitter')(app);


 require('./connections/facebook')(app);

 require('./sockets')(io);

	
var port = Number(process.env.PORT || 3000);

server.listen(port, function(){
	console.log('Servidor Corriendo en: '+port);
});

