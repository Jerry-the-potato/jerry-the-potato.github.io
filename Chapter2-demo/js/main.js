
// main.js處理動畫模組
AnimationLoop();
function AnimationLoop(){
    try{
        Resize("#game-box", canvas, context, '#000');
        Redraw();
    }catch(e){
        window.myErrorMessage = e.message;
    }
    requestAnimationFrame(AnimationLoop);
}
function Resize(boxID, canvas, context, fillStyle=undefined){
    if(WIDTH != window.innerWidth * RATIO || HEIGHT != window.innerHeight * RATIO){
        WIDTH = window.innerWidth * RATIO;
        HEIGHT = window.innerHeight * RATIO;
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
        Background.SetRange(WIDTH, HEIGHT);
    }
}
function Redraw(){
    Clear(context);
    MouseAnime();
}
function Clear(context){
    // context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fill();
}
function MouseAnime(){
    if(!isPathing){
        if(timer > 0){
            cursorX+= distanceX / period;
            cursorY+= distanceY / period;
            timer--;
        }
        else{
            cursorX+= (mouseX - cursorX) / 5;
            cursorY+= (mouseY - cursorY) / 5;
        }
    }
    let size = WIDTH * 0.1;
    if(MouseImg.complete) context.drawImage(MouseImg, cursorX-size/2, cursorY-size/2, size, size);
}