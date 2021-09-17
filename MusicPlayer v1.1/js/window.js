// 進行初始化設定
// default.js是網頁載入時，第一份載入的一次性文件，並且其function不會被其他文件重複使用
// 變數則不在此限
let X = [], Y = [], mouseX = 0 , mouseY = 0, cursorX = 0, cursorY = 0;
let cursorSize, cursorPlus = 1;
let canvas, context;
let canvasBG, contextBG, Background;
let canvasDev, contextDev;
let lineCap;
const Wr = 2, Hr = 0.6;
let WIDTH, HEIGHT;
let focusImg, focusAnime, focusLifeCycle, focusGravity;
let developerKey = 1;
let colorStyle = new Array;
colorStyle[0] = '#84fab0';
colorStyle[1] = '#8fd3f4';
colorStyle[2] = '#a1c4fd';
colorStyle[3] = '#c2e9fb';
class gradient{
    constructor(WIDTH,HEIGHT){
        //defalut
        this.stop = [
            {
                color: '#8fd3f4',
                offset: 0,
            },
            {
                color: '#84fab0',
                offset: 1,
            }
        ];
        this.theta = Math.PI * 0;
        this.centerX = WIDTH/2;
        this.centerY = HEIGHT/2;
        this.length = HEIGHT;
        this.timestamp = Date.now();
    }
    Styling = () => {
        let right = this.length/2 * Math.cos(this.theta);
        let up = (-1) * this.length/2 * Math.sin(this.theta);
        let x1 = this.centerX + right;
        let x2 = this.centerX - right;
        let y1 = this.centerY + up;
        let y2 = this.centerY - up;
        this.style = contextBG.createLinearGradient(x1, y1, x2, y2);
        this.stop.forEach((obj) => {
            this.style.addColorStop(obj.offset, obj.color);
        });
        return this.style;
    }
    Transform = () => {
        this.theta+= Math.PI / 5000;
        let right = this.length/2 * Math.cos(this.theta);
        let up = (-1) * this.length/2 * Math.sin(this.theta);
        let x1 = this.centerX + right;
        let x2 = this.centerX - right;
        let y1 = this.centerY + up;
        let y2 = this.centerY - up;
        this.style = contextBG.createLinearGradient(x1, y1, x2, y2);
        this.stop.forEach((obj, index, array) => {
            //如果對象是 hex 格式，轉成RGB
            obj.R = parseInt("0x" + obj.color.slice(1, 3));
            obj.G = parseInt("0x" + obj.color.slice(3, 5));
            obj.B = parseInt("0x" + obj.color.slice(5, 7));

            let HSV = gradient.RGBtoHSV(obj.R, obj.G, obj.B);
            let deltaTS = Date.now() - this.timestamp;
            const period = 30000;
            HSV.H = HSV.H + (array.length/(array.length + 1) - index) / 2 * 360 * deltaTS / (period);
            //HSV.S = HSV.S / 2 - (HSV.S / 2) * Math.cos(4 * Math.PI * deltaTS / period);
            if(HSV.H > 360) HSV.H = HSV.H % 360;
            else if(HSV.H < 0) HSV.H = 360 + (HSV.H % 360);
            let RGB = gradient.HSVtoRGB(HSV.H, HSV.S, HSV.V);
            let color = "#" + (RGB.R * 256 * 256 + RGB.G * 256 + RGB.B - 1).toString(16);
            this.style.addColorStop(obj.offset, color);
        });
        return this.style;
    }
    static RGBtoHSV(r,g,b){
        let max = Math.max(r,g,b);
        let min = Math.min(r,g,b);
        let h,s,v;
        if(max == min){h = max/255*360;}
        else if(max == r){h = 60 * ((g-b)/(max-min) % 6);}
        else if(max == g){h = 60 * ((b-r)/(max-min) + 2);}
        else if(max == b){h = 60 * ((r-g)/(max-min) + 4);}

        if(max == 0) s = 0;
        else s = (max - min) / max;
        v = max / 255;
        return {'H':h,'S':s,'V':v};
    }
    static HSVtoRGB(h,s,v){
        let C = v * s;
        let X = C * (1 - Math.abs((h / 60) % 2 - 1));
        let m = v - C;
        let R, G, B;
        if(h < 60){R = C; G = X; B = 0;}
        else if(h < 120){R = X; G = C; B = 0;}
        else if(h < 180){R = 0; G = C; B = X;}
        else if(h < 240){R = 0; G = X; B = C;}
        else if(h < 300){R = X; G = 0; B = C;}
        else if(h <= 360){R = C; G = 0; B = X;}

        R = Math.floor((R + m) * 255);
        G = Math.floor((G + m) * 255);
        B = Math.floor((B + m) * 255);
        return {'R':R,'G':G,'B':B};
    }
}

function Initial() {
    Points = 0;
    Red = 0;
    Yellow = 0;
    List = []; // 清空List
}
window.onload = function () { //初始畫面
    
    Initial();
    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");
    lineCap = ['butt', 'round', 'square'];
    context.lineCap = lineCap[1];
    canvasBG = document.getElementById("canvasBG");
    contextBG = canvasBG.getContext("2d");
    canvasDev = document.getElementById("canvasDev");
    contextDev = canvasDev.getContext("2d");

    // 自適應寬度
    WIDTH = window.innerWidth*Wr;
    if(WIDTH > 1200 * 2)WIDTH = 1200 * 2;
    HEIGHT = WIDTH * Hr;
    Background = new gradient(WIDTH, HEIGHT);

    let gameBox = document.getElementById("gameBox");
    gameBox.style.width = WIDTH/Wr + "px";
    gameBox.style.height = HEIGHT/Wr + "px";

    let resize = (canvas, context, WIDTH, HEIGHT, fillStyle) => {
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.style.width = WIDTH/Wr + "px";
        canvas.style.height = HEIGHT/Wr + "px";
        context.beginPath();
        context.rect(0, 0, WIDTH, HEIGHT);
        context.fillStyle = fillStyle;
        context.fill();
    }
    resize(canvas, context, WIDTH, HEIGHT, '#000000');
    resize(canvasBG, contextBG, WIDTH, HEIGHT, Background.Styling());
    resize(canvasDev, contextDev, WIDTH, HEIGHT/2, '#000000');
    
    //取得 canvas 於頁面的位置
    let canvasRect = canvas.getBoundingClientRect();

    //監聽canvas
    window.addEventListener('mousemove', function (e) {
        mouseX = (e.pageX - canvasRect.left) * Wr;
        mouseY = (e.pageY - canvasRect.top) * Wr;
    }, false);

    canvas.addEventListener('touchstart', function (e) {
        mouseX = (e.touches[0].pageX - canvasRect.left) * Wr;
        mouseY = (e.touches[0].pageY - canvasRect.top) * Wr;
    }, false);

    canvas.addEventListener('touchmove', function (e) {
        mouseX = (e.touches[0].pageX - canvasRect.left) * Wr;
        mouseY = (e.touches[0].pageY - canvasRect.top) * Wr;
    }, false);

    window.addEventListener('keydown', function(e) {
        if(e.key == 'c'){
            developerKey = (developerKey-1) * (-1);
        }
        else if(e.key == 'z'){
            keydownArray.splice(keydownArray.length - 1, 1, HEIGHT*0.3);
        }
    }, false);

    //for(let N=0; N<50;N++){List.push(new objAnimation());}
	AnimationLoop();
}