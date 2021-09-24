// default.js 進行初始化設定

const RATIO = 2;
let WIDTH, HEIGHT;
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];
context.lineCap = lineCap[1];

Resize("#game-box", canvas, context, '#000');
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

let input = {
    'linear': 0,
    'easein': 0,
    'easeout': 1,
    'set': function(a, b, c){
        this.linear = a;
        this.easein = b;
        this.easeout = c; 
    }
}