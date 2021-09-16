
// event.js 處理所有事件監聽和使用者交互


// 監聽 canvas
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let cursorSize = 100;
let isPathing = false;
let period = 90, timer = 0;
let distanceX = 0, distanceY = 0;
canvas.addEventListener('mousedown', () => isPathing = true);
canvas.addEventListener('mousemove', GetMouse);
canvas.addEventListener('mouseup', GetDistance);
canvas.addEventListener('mouseenter', () => timer = 0);
let Rect = canvas.getBoundingClientRect();
function GetMouse(e){
    mouseX = (e.pageX - Rect.left) * RATIO;
    mouseY = (e.pageY - Rect.top) * RATIO;
    distanceX = (mouseX - cursorX);
    distanceY = (mouseY - cursorY);
    timer = 90;
}
function GetDistance(){
    distanceX = (mouseX - cursorX);
    distanceY = (mouseY - cursorY);

    timer = 90;
    isPathing = false;
}


canvas.addEventListener('click', SetMouse);
function SetMouse(e){
    originX = (e.pageX - Rect.left) * RATIO;
    originY = (e.pageY - Rect.top) * RATIO;
    size = 200;
    rotateTheta = 0 / 180 * Math.PI;
    rotateOmega = 40 / 180 * Math.PI;
    revolveTheta = 0 / 180 * Math.PI;
    revolveOmega = 90 / 180 * Math.PI;
    timestamp = Date.now();
    lifeCycle = 6;
}

let originX;
let originY;

let timestamp = Date.now();
let lifeCycle;

let rotateTheta = 0 / 180 * Math.PI;
let rotateOmega = 40 / 180 * Math.PI;
let size = 200;
let revolveTheta = 0 / 180 * Math.PI;
let revolveOmega = 90 / 180 * Math.PI;



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
document.querySelector("#linear").addEventListener('click', ToggleAnime);
document.querySelector("#easein").addEventListener('click', ToggleAnime);
document.querySelector("#easeout").addEventListener('click', ToggleAnime);
document.querySelector("#special").addEventListener('click', ToggleAnime);
function ToggleAnime(){
    console.log("toggle");
    let dialog = document.querySelector("#dialog");
    dialog.textContent = '當前跟隨模式: ' + this.textContent;
    switch(this.attributes.id.nodeValue){
        case 'linear':
            input.set(1, 0, 0);
        break;
        case 'easein':
            input.set(0, 1, 0);
        break;
        case 'easeout':
            input.set(0, 0, 1);
        break;
        case 'special':
            input.set(0, -1.5, 2.5);
        break;
    }
}
let alpha = 1;
document.querySelector("#blurMode").addEventListener('click', ToggleBlur);
function ToggleBlur(){
    if(alpha == 1){
        alpha = 0.08;
    }
    else{
        alpha = 1;
    }
}