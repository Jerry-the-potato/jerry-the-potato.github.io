
// event.js 處理所有事件監聽和使用者交互


// 監聽 canvas
let mouseX = 200, mouseY = 500;
let Rect = canvas.getBoundingClientRect();

let isWinding = false;
let a = 0, b = 0;
let myTree = new Tree(window.innerWidth, window.innerHeight*2, window.innerHeight/3, 90, 8);

canvas.addEventListener('mousemove', GetMouse);

function GetMouse(e) {
    let Rect = canvas.getBoundingClientRect();
    if(!isWinding){
        a = ((e.pageX - Rect.left) * RATIO - WIDTH/2) / (WIDTH/2);
        b = ((e.pageY - Rect.top) * RATIO - HEIGHT/2) / (HEIGHT/2);
        a = 2 * Math.pow(a, 2) * ((a>0)?1:-1);
        b = 2 * Math.pow(b, 2) * ((b>0)?1:-1);
        const frames = 90;
        myMouse.NewTarget(a, b, frames);
        // myTree.Transform();
    }
}

canvas.addEventListener('click', Recreate);

function Recreate(e){
    let x = (e.pageX - Rect.left) * RATIO;
    let y = (e.pageY - Rect.top) * RATIO;
    let myTree = new Tree(window.innerWidth, window.innerHeight*2, window.innerHeight/3, 90, 5);
}



document.querySelector("#linear").addEventListener('click', ToggleAnime);
document.querySelector("#easein").addEventListener('click', ToggleAnime);
document.querySelector("#easeout").addEventListener('click', ToggleAnime);
document.querySelector("#special").addEventListener('click', ToggleAnime);
function ToggleAnime(){
    console.log("toggle");
    let dialog = document.querySelector("#dialog");
    dialog.textContent = '跟隨模式: ' + this.textContent;
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


document.querySelector("#wind").addEventListener('click', ToggleWind);
function ToggleWind(){
    dialog.textContent = '當前模式: 自主隨風擺動';
    if(isWinding){
        isWinding = false;
    }
    else{
        isWinding = true;
        myMouse.Restore();
    }
}