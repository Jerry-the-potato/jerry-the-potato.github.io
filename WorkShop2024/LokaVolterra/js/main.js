const board_border = "black";
const board_background = "black";
const board = document.getElementById("canvas");
const board_ctx = board.getContext("2d");
let pixelX;
let pixelY;

// 繪圖系統-管理及方法
let painter = new createPainter();
function createPainter(){
	this.works = [];
	this.pixelX = window.innerWidth;
	this.pixelY = window.innerWidth;
	this.setPixel = function(w, h){
		this.pixelX = w;
		this.pixelY = h;
	}
	this.draw = function(obj){ // 透過 painter.draw 呼叫其私有函式
		let ctx = obj.ctx;
		let w = this.pixelX;
		let h = this.pixelY;
		let x = obj.x;
		let y = obj.y;
		let r = obj.r;
		let x2 = obj.x2;
		let y2 = obj.y2;
		let size = obj.size;
		let color = obj.color;
		switch(obj.name){
			case "circle": drawCircle();
			break;
			case "point": drawPoint();
			break;
			case "line": drawLine();
		}
		function drawCircle() {
			if(x + y + r == "NaN"){
				console.warn("drawCircle failed: missing parameter");
				return;
			}
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI, false);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.lineWidth = 5;
		}
		
		function drawPoint() {
			if(x + y + size == "NaN"){
				console.warn("drawPoint failed: missing parameter");
				return;
			}
			ctx.fillRect(x - size/2, y - size/2, size, size);
			ctx.fillStyle = color;
			ctx.fill();
		}
		
		function drawLine() {
			if(x + y + x2 + y2 == "NaN"){
				console.warn("drawLine failed: missing parameter");
				return;
			}
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x2, y2);
			ctx.strokeStyle = color;
			ctx.lineWidth = 1;
			ctx.stroke();
		}
	}
}

// 繪圖系統-main
{
	window.onload = function main() {
		clear_board();
		painter.works.forEach(obj => {painter.draw(obj);});
		painter.works = [];
		requestAnimationFrame(main);
	}

	function clear_board() {
		board_ctx.fillStyle = board_background;
		board_ctx.strokestyle = board_border;
		board_ctx.fillRect(0, 0, board.width, board.height);
		board_ctx.strokeRect(0, 0, board.width, board.height);
	}
}

// 介面系統-PC滑鼠跟隨
function mouseTrail(x = 0, y = 0){
	this.pointX = x;
	this.pointY = y;

	this.originX = x;
	this.originY = y;
	this.targetX = x;
	this.targetY = y;
	this.period = 1;
	this.timer = 0;
	this.period = 30;

	this.timestamp = Date.now();

	this.newTarget = function(targetX, targetY, frames){
		this.targetX = targetX;
		this.targetY = targetY;
		this.originX = this.pointX;
		this.originY = this.pointY;
		this.timer = 30;
		this.period = 30;
	}
	this.restore = function(){
		this.originX = 0;
		this.originY = 0;
		this.timer = 0;
	}
	this.nextFrame = function(){
		if(this.timer > 0){
			let dX = this.targetX - this.originX;
			let dY = this.targetY - this.originY;
			let t = this.timer;
			let p = this.period;
			let linear = 1/p;
			let easeout = Math.pow(t/p, 2) - Math.pow((t-1)/p, 2);
			let easein = Math.pow(1 - (t-1)/p, 2) - Math.pow(1 - t/p, 2);
			let a = 0;
			let b = 0;
			let c = 1;
			this.pointX+= (a * linear + b * easein + c * easeout) * dX;
			this.pointY+= (a * linear + b * easein + c * easeout) * dY;
			this.timer--;
		}
		else{
			this.originX = this.pointX;
			this.originY = this.pointY;
		}
	}
}
let myMouse = new mouseTrail(0, 0);
{
	board.addEventListener("mousemove", function(e){
		let Rect = board.getBoundingClientRect();
		if(true){
			a = ((e.pageX - Rect.left)) / (pixelX);
			b = ((e.pageY - Rect.top)) / (pixelY);
			const frames = 30;
			myMouse.newTarget(a, b, frames);
		}
	}, false);

	loop();
	function loop(){
		myMouse.nextFrame();
		requestAnimationFrame(loop);
	}
}
// 介面系統-RWD
{
	setScreen();
	function setScreen(){
		if(pixelX != window.innerWidth){
			let w = window.innerWidth;
			let h = window.innerHeight;
			board.style.width = w + "px";
			board.style.height = h + "px";
			board.width = w;
			board.height = h;
			painter.setPixel(w, h);
			pixelX = board.width;
			pixelY = board.height;
		}
		requestAnimationFrame(setScreen);
	}
}

// 粒子系統-Lotka Volterra紋理
{
	let transitionRadian = 0;
	let trasitionOmega = Math.PI / 10000;
	let data = [];
	let speed = 0;
	let dlength = 0;
	let alpha = 0;
	let beta = 0;
	let gamma = 0;
	let delta = 0;
	let mouseOn = false;
	let transform = true;
	// let scale = 1;

	// UI子系統
	{
		document.getElementById("pause").addEventListener("click", function(){
			if(this.innerText == "停止動畫"){
				trasitionOmega = 0;
				this.innerText = "開始動畫";
			}
			else{
				trasitionOmega = 0.003;
				this.innerText = "停止動畫";
			}
		}, false);

		document.getElementById("mouseOn").addEventListener("click", function(){
			if(this.innerText == "跟隨滑鼠"){
				mouseOn = true;
				this.innerText = "取消跟隨";
			}
			else{
				mouseOn = false;
				this.innerText = "跟隨滑鼠";
			}
		}, false);
		
		document.getElementById("transform").addEventListener("click", function(){
			if(this.innerText == "取消縮放"){
				transform = false;
				this.innerText = "加入縮放";
			}
			else{
				transform = true;
				this.innerText = "取消縮放";
			}
		}, false);

		getValue();
		function getValue(){
			alpha = document.getElementById("alpha-equation").value*0.1;
			beta = document.getElementById("beta-equation").value*0.1;
			gamma = document.getElementById("gamma-equation").value*0.1;
			delta = document.getElementById("delta-equation").value*0.1;
			
			dlength = parseFloat(document.getElementById("dlength").value)*0.01;
			speed = parseInt(document.getElementById("speed").value);
		}
		document.getElementById("game-menu").addEventListener("click", getValue, false);
		// 我很懶，反正菜單介面被滑鼠點擊就會自動更新所有參數
	}

	// 隨機點及渲染子系統
	{
		data = [];
		populate(data, 5000);
		simulatior();
		function simulatior(){
			addTexture(data);
			requestAnimationFrame(simulatior);
		}
		function populate(data, n) {
			for (let i = 0; i < n; i++) {
				let mid = 0.5;
				let pow = 1;
				let max = 1 + Math.pow(mid, pow);
				let obj = {
					"d": (max - Math.pow(getRandomFloat(mid, 1), pow) - Math.pow(getRandomFloat(0, mid), pow)) * (pixelX + pixelY) * 0.5,  // distance
					"r": getRandomFloat(0, Math.PI * 2), // radian
					"x": pixelX/2,
					"y": pixelY/2,
				};
				obj.x+= obj.d * Math.cos(obj.r),
				obj.y+= obj.d * Math.sin(obj.r),
				data.push(obj);
			}

			function getRandomFloat(min, max) {
				return Math.random() * (max*100 - min*100 + 1)/100 + min;
			}
		}
	}
	function addTexture(list) {
		for (let i = 0; i < list.length; i++) {
			let point = list[i];
			{
				const rad = transitionRadian;
				const p1 = Math.cos(rad)*Math.sin(rad);
				const p2 = Math.sin(rad);
				const p3 = Math.sin(rad*2);
				let d = point.d / 2;
				if(transform) d = point.d / 3 * (0.05 + 0.95 * (1 - p3));
				let vx = d * p1 * 0.1;
				let vy = d * p2 * 0.1;
				// point.r+= Math.PI / 1000;
				point.x = pixelX/2 + d * Math.cos(point.r + vx);
				point.y = pixelY/2 + d * Math.sin(point.r + vy);
			}
			let x = point.x;
			let y = point.y;
			let ex = x / pixelX;
			let ey = y / pixelY;
			let dx = equation1(ex, ey) * pixelX;
			let dy = equation2(ex, ey) * pixelY;
			
			let blue = y/pixelX * 255;
			let green = x/pixelX * 255;
			let red = Math.sin(transitionRadian) * 255;
			let color = "rgb(" + Math.abs(red).toString() + "," + Math.abs(green).toString() + "," + Math.abs(blue).toString() + ")";
			
			let mypoint = {
				"name": "point",
				"ctx": board_ctx,
				"x": x,
				"y": y,
				"size": 2,
				"color": color
			}
			painter.works.push(mypoint);
			let myline = {
				"name": "line",
				"ctx": board_ctx,
				"x": x,
				"y": y,
				"x2": x + dlength * dx,
				"y2": y + dlength * dy,
				"color": color
			}
			painter.works.push(myline);
		}
		transitionRadian += trasitionOmega * speed;

		function equation1(x, y) {
			if(mouseOn){
				let ratio = (myMouse.pointY > 0.2) ? myMouse.pointY : 0.2;
				return alpha * x - (1 / ratio * alpha * x * y);
			}
			else return alpha * x - (beta * x * y);
		}

		function equation2(x, y) {
			if(mouseOn){
				let ratio = (myMouse.pointX > 0.2) ? myMouse.pointX : 0.2;
				return (1 / ratio * gamma * x * y) -  gamma * y;
			}
			else return (delta * x * y) -  gamma * y;
		}
	}


}