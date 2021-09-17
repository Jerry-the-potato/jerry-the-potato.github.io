let startDate = new Date;
let stop = true;
function Test(e){
    // console.log(window.scrollY);
    startDate = new Date;
    stop = false;
}
function Stop(){
    if(stop == false && new Date - startDate > 200){
        //console.log("stop!");
        stop = true;
    }
    requestAnimationFrame(Stop);
}
requestAnimationFrame(Stop);
window.addEventListener("scroll", Test, false);


// 主要頁面效果
let canvas = document.querySelector("#cover-canvas"),
    context = canvas.getContext("2d");

let cursorX = window.innerWidth / 2,
    cursorY = window.innerHeight / 2;
// mouse event 的真實座標
let mouseX = window.innerWidth / 2, 
    mouseY = window.innerHeight / 2,
    MouseImg = new Image();
    MouseImg.src = "images/favicon.ico";
    
let pngImg = new Array();
for(let n = 0; n < 2; n++){
    pngImg[n] = new Image();
    pngImg[n].src = "images/snow" + (n+1) + ".png";
}
pngImg[2] = new Image();
pngImg[2].src = "images/sparkle@4x.png";
let animeList = new Array();
let timeline1 = Date.now();
let timeline2 = Date.now();
let WIDTH, HEIGHT;
let RATIO = 2;
function Resize(boxID, canvas, context, fillStyle=undefined){
    if(WIDTH != window.innerWidth * RATIO || HEIGHT != window.innerHeight * RATIO){
        WIDTH = window.innerWidth * RATIO;
        HEIGHT = window.innerHeight * RATIO;
        let box = document.querySelector(boxID);
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.style.width = WIDTH/RATIO + "px";
        canvas.style.height = HEIGHT/RATIO + "px";
        box.style.width = WIDTH/RATIO + "px";
        box.style.height = HEIGHT/RATIO + "px";
        if(fillStyle != undefined){
            context.beginPath();
            context.rect(0, 0, WIDTH, HEIGHT);
            context.fillStyle = fillStyle;
            context.fill();
        }
    }
}
let MouseEffect = () => {
    try{
        Resize("#header", canvas, context);
        let check = Math.abs(mouseX - cursorX) + Math.abs(mouseY - cursorY);
        if(true){
            // console.log(check);
            const slippery = 10;
            cursorX = cursorX + (mouseX - cursorX) / slippery;
            cursorY = cursorY + (mouseY - cursorY) / slippery;
            const W = 0.05 * WIDTH / RATIO;
            const H = 0.05 * HEIGHT / RATIO;
            let ratioX = (WIDTH / RATIO / 2 - cursorX ) / (WIDTH / RATIO / 2);
            let transX = (ratioX / 2) * W;
            let ratioY = (HEIGHT / RATIO / 2 - cursorY ) / (HEIGHT / RATIO / 2);
            let transY = (ratioY / 2) * H;

            let coverbg = document.querySelector('#cover-bg');
            let covermaskR = document.querySelector('#cover-maskR');
            let covermaskL = document.querySelector('#cover-maskL');
            coverbg.style.transform = 'translate(' + (transX-W) + 'px, ' + (transY-H) + 'px)';
            covermaskR.style.transform = 'translate(' + (transX-W)*2 + 'px, ' + (transY-H)*2 + 'px)';
            covermaskL.style.transform = 'translate(' + (transX-W)*2 + 'px, ' + (transY-H)*2 + 'px)';
        
            if(Date.now() - timeline1 > 400){
                timeline1 = Date.now();
                animeList.push(new objAnimation("Staring", 2,
                                                0.05, 0.95,
                                                0, 0.5,
                                                0.02, 0.03));
                animeList.push(new objAnimation("Falling", 0,
                                                -0.5, 0.5,
                                                -0.5, 1,
                                                0.03, 0.08,
                                                12000));
                animeList.push(new objAnimation("Falling", 0,
                                                0.5, 1.5,
                                                -0.5, 1,
                                                0.03, 0.08,
                                                12000));
                animeList.push(new objAnimation("Falling", 0,
                                                -0.5, 1.5,
                                                -0, 0.5,
                                                0.03, 0.08,
                                                12000));
            }

            canvas.width = WIDTH;
            
            // RWD: 計算 background-size: cover 隨著畫面寬度長短，所增減的高度
            let dy = -0.1 * HEIGHT;
            if(WIDTH / RATIO > 800) dy = (WIDTH / RATIO -1000)/500*0.25*HEIGHT/RATIO;
            
            // 繪製雪花
            context.translate(transX * RATIO, transY * RATIO - dy);
            animeList.slice().reverse().forEach((obj, index, array) => {
                obj.NextFrame();
                if(obj.Vinishing()){
                    animeList.splice(array.length - 1 - index, 1);
                }
            })
            context.translate(-transX * RATIO, -(transY * RATIO - dy));

            // 藍色濾鏡
            context.globalAlpha = 1;
            context.beginPath();
            context.fillStyle = 'rgba(12, 51, 99, 0.2)';
            context.fillRect(0, 0, canvas.width, canvas.height);

            // 在視角（窗戶）中心畫下十字線
            context.save();
            context.translate(transX * 2 * RATIO, transY * 2 * RATIO - dy);
            const length = 20;
            context.translate(WIDTH/RATIO, HEIGHT/RATIO);
            context.beginPath();
            context.moveTo(-length, 0);
            context.lineTo(length, 0);
            context.moveTo(0, -length);
            context.lineTo(0, length);
            context.lineWidth = 3;
            context.strokeStyle = "rgb(255,255,255)";
            context.stroke();
            context.restore();
        }
    }catch(e){
        window.myErrorMessage = e.message;
    }
    if(true == true){
        requestAnimationFrame(MouseEffect);
    }
}
requestAnimationFrame(MouseEffect);
let cover = document.querySelector('#cover');
cover.style.width = "100%";
cover.style.height = "100%";

if(window.innerWidth > 991){
    cover.addEventListener("mousemove", function(event){
        mouseX = event.clientX;
        mouseY = event.clientY;
        if(stop == true){
            // console.log(event);
            startDate = new Date;
            stop = false;
        }
    }, false);
}
cover.addEventListener("touchmove", function(event){
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
    if(stop == true){
        // console.log(event);
        startDate = new Date;
        stop = false;
    }
}, false);



// 手機感測器
// window.addEventListener('deviceorientation', function(event) {
//     let alpha = event.alpha;
//     let beta = event.beta;
//     let gamma = event.gamma;
//   }, false);

// let Menu = () => {
    
// }
// setTimeout(Menu(), 300);
let focusGravity = "gravityOff";
document.querySelector("#Elsa-mode-on").addEventListener("click", function(event){
    focusGravity = "gravityOn";
}, false);
document.querySelector("#Elsa-mode-off").addEventListener("click", function(event){
    focusGravity = "gravityOff";
}, false);



class objAnimation{
	constructor(animeName=focusAnime,imgNumber=1,
                Xmin=0.4,Xmax=0.6,
                Ymin=0.4,Ymax=0.6,
                Smin=0.04,Smax=0.06,
                lifeCycle= 5000,
                timestamp= Date.now()
    ){
        this.animeName = animeName;
        this.imgNumber = imgNumber;
        if(this.imgNumber == 0){this.imgNumber = Math.floor(Math.random()*2);}
        this.x = Math.random() * (Xmax - Xmin) + Xmin;
        this.y = Math.random() * (Ymax - Ymin) + Ymin;
        this.pointX = this.x;
        this.pointY = this.y;
        this.s = Math.random() * (Smax - Smin) + Smin;
        this.size = 0;
        this.rotateOmega = 2 * Math.PI * (1/10 - Math.random() * (1/5));
        this.rotate = Math.floor(Math.random() * 360) / 180 * Math.PI;
        this.period = (1 + Math.random() * 1);
        this.revolve = Math.floor(Math.random() * 360) / 180 * Math.PI;
		this.timestamp = timestamp;
        this.lifeCycle = lifeCycle;
        this.alpha = Math.random() * 0.9 + 0.1;
	}
    NextFrame(){
        let deltaTS = (Date.now() - this.timestamp);

        if(this.animeName == "Floating") this.Floating(deltaTS);
        else if(this.animeName == "Falling") this.Falling(deltaTS);
        else if(this.animeName == "Staring") this.Staring(deltaTS);
        
        // 如果超出畫面，不進行繪製
        if(this.pointX < 0 || this.pointX > WIDTH || this.pointY < 0 || this.pointY > HEIGHT*1.2){
            return;
        }
        let rotate = this.rotate * 1 + this.rotateOmega * (deltaTS/1000);
        context.save();
        context.translate(this.pointX, this.pointY); //FallenImg2 平移
        context.rotate(rotate); //FloatImg3 正旋轉
        context.globalAlpha = this.alpha;
        if(pngImg[this.imgNumber].complete)
            context.drawImage(pngImg[this.imgNumber], 0, 0,
                              pngImg[this.imgNumber].width, pngImg[this.imgNumber].height,
                              -this.size / 2, -this.size / 2, this.size, this.size);
        context.restore();
    }
    Floating(deltaTS){
        const microsecond = 15000;
        let revolve = this.revolve + (((deltaTS) / microsecond * 2 * Math.PI)/this.period);
        let radius = (this.lifeCycle - deltaTS*0.7) / this.lifeCycle / (0.5 + 0.5 * this.period); // (0.3~1 / 1~1.5)
        this.pointX = WIDTH * this.x + radius * WIDTH/2 * Math.cos(revolve); // 對Vx積分
        this.pointY = HEIGHT * this.y + radius * HEIGHT/2 * Math.sin(revolve); // Vy積分
        if(focusGravity == "gravityOn"){
            this.pointX = this.pointX + (cursorX - WIDTH / 2) / (WIDTH / 2) * (deltaTS)/10 * Math.cos(revolve); //風的最大影響範圍(單位:像素)
            this.pointY = this.pointY + (cursorY - HEIGHT / 2) / (HEIGHT / 2) * (deltaTS)/10 * Math.sin(revolve);
        }
        const popSize = 0.2;
        this.size = WIDTH * this.s * ((1 + popSize) - Math.abs(deltaTS - this.lifeCycle/2) / (this.lifeCycle/2));
    }
    Falling(deltaTS){
        const microsecond = 6000;
        let revolve = this.revolve + (((deltaTS) / microsecond * 2 * Math.PI)/this.period);
        this.pointX = WIDTH * this.x + this.period * WIDTH * 0.04 * Math.sin(revolve); // 對Vx積分
        this.pointY = HEIGHT * this.y + this.period * HEIGHT * 0.03 * (deltaTS/1000) + this.period * HEIGHT * 0.02 * Math.cos(revolve/this.period); // Vy積分
        if(focusGravity == "gravityOn"){
            this.pointX = this.pointX + (cursorX - WIDTH / 2) / (WIDTH / 2) * (deltaTS)/15; //風的最大影響範圍(單位:像素)
            this.pointY = this.pointY + (cursorY - HEIGHT / 2) / (HEIGHT / 2) * (deltaTS)/15;
        }
        const popSize = 0.2;
        this.size = WIDTH * this.s * ((1 + popSize) - (Math.abs(deltaTS - this.lifeCycle*0.35) + Math.abs(deltaTS - this.lifeCycle*0.65)) /this.lifeCycle);
    }
    Staring(deltaTS){
        const microsecond = 10000;
        let revolve = this.revolve + (((deltaTS) / microsecond * 2 * Math.PI)/this.period);
        this.pointX = WIDTH * this.x; // 對Vx積分
        this.pointY = HEIGHT * this.y; // Vy積分
        const popSize = 0.2;
        this.size = WIDTH * this.s * ((1 + popSize) - (Math.abs(deltaTS - this.lifeCycle*0.35) + Math.abs(deltaTS - this.lifeCycle*0.65)) /this.lifeCycle);
    }
    Vinishing(){
        if(Date.now() - this.timestamp > this.lifeCycle){
            return true;
        }
        else{
            return false;
        }
        
    }
}