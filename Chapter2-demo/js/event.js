
// event.js 處理所有事件監聽和使用者交互


// 監聽 canvas
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let cursorSize = 100;
let isPathing = false;
let period = 0, timer = 0;
let distanceX = 0, distanceY = 0;
canvas.addEventListener('mousedown', () => isPathing = true);
canvas.addEventListener('mousemove', GetMouse, false);
canvas.addEventListener('mouseup', GetDistance);
canvas.addEventListener('mouseout', GetDistance);
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