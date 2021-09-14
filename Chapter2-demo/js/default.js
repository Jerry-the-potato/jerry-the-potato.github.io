// default.js 進行初始化設定

const RATIO = 2;
let WIDTH, HEIGHT;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];
context.lineCap = lineCap[1];