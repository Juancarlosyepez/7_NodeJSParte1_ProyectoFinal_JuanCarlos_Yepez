function init(){

	let mouse = {
		click: false,
		move:false,
		pos: {x: 0, y:0},
		pos_prev:false
	};

	var canvas = document.getElementById('drawing');
	var context = canvas.getContext('2d');
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	document.addEventListener('mousedown',function(e){
		mouse.click = true;
		console.log(mouse);
	});


}

document.addEventListener('DOMContentLoaded', init)