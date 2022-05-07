// default.js 進行初始化設定

const RATIO = window.devicePixelRatio;
let WIDTH, HEIGHT;
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];

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