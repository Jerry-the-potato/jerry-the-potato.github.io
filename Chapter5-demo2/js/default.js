// default.js 進行初始化設定

let RATIO = 2;
let WIDTH, HEIGHT;
let gameScores = 0;
let lifePoint = 0;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];
let lineJoin = ['round','bevel','miter'];

Resize("#game-box", canvas, context, '#000');
function Resize(boxID, canvas, context, fillStyle=undefined){
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    // if(width > height) width = Math.min(width, height*1.5);
    // else height = Math.min(width*1.5, height);
    if(WIDTH != width * RATIO || HEIGHT != height * RATIO){
        WIDTH = width * RATIO;
        HEIGHT = height * RATIO;
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
        context.lineCap = lineCap[1];
    }
}


// 設定音訊
let AudioContext = window.AudioContext || window.webkitAudioContext; //相容性
let audioCtx = new AudioContext();

// 創建節點
let audio = document.querySelector("#Music");
let source = audioCtx.createMediaElementSource(audio);
let gainNode = audioCtx.createGain();
let analyserNode = audioCtx.createAnalyser();
// 連接節點
source.connect(gainNode);
gainNode.connect(analyserNode);
analyserNode.connect(audioCtx.destination);
// 對每個節點進行設定
gainNode.gain.value = 1;
analyserNode.fftSize = 2048;
let bufferLength = analyserNode.frequencyBinCount;
let dataArray = {'pre': new Uint8Array(bufferLength).fill(0),
                 'next': new Uint8Array(bufferLength).fill(0),
                 'delta': new Uint8Array(bufferLength).fill(0),
                 'volume': new Array(bufferLength).fill(0),
                 'pulse':  new Array(bufferLength).fill(0)};
let dataIndex = {'volume': 0};

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