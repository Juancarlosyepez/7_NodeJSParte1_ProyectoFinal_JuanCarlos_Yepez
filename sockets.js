module.exports = function(io){


	var redis = require('redis');
	var client = redis.createClient();
	var draw_history = [];

	io.on('connection',function(socket){
		console.log('New User Connected');

		socket.on('disconnect', function(){
			console.log('user disconnected');
			client.hdel("usuarios", socket.id);
			client.hgetall("usuarios",function(err,usuarios){
				console.log("NUEVO USUARIO"+usuarios);
				io.emit('new user', usuarios);
			});
		});

		socket.on('new user', function(nombre){
			console.log("NUEVO USUARIO"+socket.id);
			client.hset("usuarios", socket.id.toString(),nombre);
			client.hgetall("usuarios",function(err,usuarios){
					console.log("NUEVO USUARIO"+usuarios);
				io.emit('new user', usuarios);
			});
		});

		socket.on('new user image',function(img){
			console.log("IMG add "+img);
			socket.broadcast.emit('addImg', img);
		});
	

		/*for(let i in draw_history){
			socket.emit('draw_img', {line: draw_history[i]});
		}*/

		socket.on('draw_img', function(data){
			draw_history.push(data.line);
			//console.log("DATA "+data)
			io.emit('draw_img',data);

		});

		socket.on('user image',function(image){
			console.log('imagen recibida '+image);
			io.emit('addimage',image);
		});
	});
}