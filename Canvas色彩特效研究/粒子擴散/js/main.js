
// main.js處理動畫模組
let timestamp = Date.now();
AnimationLoop();
function AnimationLoop(){
    try{
        // console.log(Date.now() - timestamp);
        Resize("#game-box", canvas, context);
        Redraw();
        timestamp = Date.now();
    }catch(e){
        window.myErrorMessage = e.message;
        throw(e);
        return;
    }
    requestAnimationFrame(AnimationLoop);
}
function Resize(boxID, canvas, context, fillStyle=undefined){
    // if(WIDTH != window.innerWidth * RATIO || HEIGHT != window.innerHeight * RATIO){
    //     WIDTH = window.innerWidth * RATIO;
    //     HEIGHT = window.innerHeight * RATIO;
    let a = (window.innerWidth - 200 <= window.innerHeight - 100) ? window.innerWidth - 200 : window.innerHeight - 100;
    if(WIDTH != a * RATIO){
            WIDTH = a * RATIO;
            HEIGHT = a * RATIO;
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
        pixels = new pixelCreater(WIDTH, HEIGHT);
    }
}
function Redraw(){
    Clear(context);
    MouseAnime();
    PixelAnime();
}
function Clear(context){
    context.clearRect(0, 0, WIDTH, HEIGHT);
    // context.beginPath();
    // context.rect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'rgba(0, 0, 0, ' + 1 + ')';
    // context.fill();
}
function MouseAnime(){
    // context.fillStyle = 'rgba(255, 255, 200, ' + 1 + ')';
    // context.fillRect(WIDTH/3, HEIGHT/3, WIDTH/3, HEIGHT*2/3);
    myMouse.NextFrame();
    // myTree.Transform();
    // myTree.Draw();
}
function PixelAnime(){
    if(switchs["spread"]["On"]) pixels.Spread();
    pixels.Draw();
}