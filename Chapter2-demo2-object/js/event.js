
// event.js 處理所有事件監聽和使用者交互


// 監聽 canvas
let mouseX = 200, mouseY = 500;
canvas.addEventListener('mousemove', GetMouse);
let Rect = canvas.getBoundingClientRect();
function GetMouse(e){
    mouseX = (e.pageX - Rect.left) * RATIO;
    mouseY = (e.pageY - Rect.top) * RATIO;
    const frames = 90;
    leaf.Refollow(frames);
}

canvas.addEventListener('click', SetMouse);

function SetMouse(e){
    let x = (e.pageX - Rect.left) * RATIO;
    let y = (e.pageY - Rect.top) * RATIO;
    leaf = new leafMaker(x, y, 6)
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