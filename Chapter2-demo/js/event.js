
// event.js 處理所有事件監聽和使用者交互


// 監聽 canvas
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let cursorSize = 100;
let isPathing = false;
let period = 0, timer = 0;
let distanceX = 0, distanceY = 0;
canvas.addEventListener('mousedown', () => isPathing = true);
canvas.addEventListener('mousemove', GetMouse);
canvas.addEventListener('mouseup', GetDistance);
canvas.addEventListener('mouseout', GetDistance);
canvas.addEventListener('mouseenter', () => timer = 0);
function GetMouse(e){
    let Rect = canvas.getBoundingClientRect();
    mouseX = (e.pageX - Rect.left) * RATIO;
    mouseY = (e.pageY - Rect.top) * RATIO;
}
function GetDistance(){
    distanceX = (mouseX - cursorX);
    distanceY = (mouseY - cursorY);
    period = 90;
    timer = 90;
    isPathing = false;
}


let input = {
    'linear': 1,
    'easein': 0,
    'easeout': 0,
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
    dialog.textContent = '已選擇: ' + this.textContent;
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