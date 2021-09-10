// default.js 進行初始化設定

const RATIO = 2;
let WIDTH, HEIGHT;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];
context.lineCap = lineCap[1];

// 自適應寬度
let gameBox = document.getElementById("game-box");
gameBox.style.width = window.innerWidth + "px";
gameBox.style.height = window.innerHeight + "px";
WIDTH = window.innerWidth * RATIO;
HEIGHT = window.innerHeight * RATIO;

let resize = (boxID, canvas, context, WIDTH, HEIGHT, fillStyle) => {
    let box = document.querySelector(boxID);
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.width = WIDTH/RATIO + "px";
    canvas.style.height = HEIGHT/RATIO + "px";
    box.style.width = WIDTH/RATIO + "px";
    box.style.height = HEIGHT/RATIO + "px";
    context.beginPath();
    context.rect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = fillStyle;
    context.fill();
}
resize('#game-box', canvas, context, WIDTH, HEIGHT, '#000000');

// 設定音訊
let audio = document.querySelector("#Music");
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = audioCtx.createMediaElementSource(audio);
let analyserNode = audioCtx.createAnalyser();
source.connect(analyserNode);
analyserNode.connect(audioCtx.destination);
analyserNode.fftSize = 2048;
let bufferLength = analyserNode.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyserNode.getByteFrequencyData(dataArray);