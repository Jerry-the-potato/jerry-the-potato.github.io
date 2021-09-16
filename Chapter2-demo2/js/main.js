
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
    }
}
function Redraw(){
    MouseAnime();
}
function Clear(context){
    // context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
    context.fill();
}
function MouseAnime(){
    
    if(!isPathing){
        let deltaTS = (Date.now() - timestamp) / 1000;
        Clear(context);
        if(lifeCycle > deltaTS){

            let rotateNow = rotateTheta + rotateOmega * deltaTS;
            let revolveNow = revolveTheta + revolveOmega * deltaTS;

            let A = Math.sin(revolveNow);
            let B = Math.cos(revolveNow);
            let C = Math.sin(revolveNow * 1.5);
            let D = Math.cos(revolveNow * 1.5);
            cursorX = originX + 500 * A;
            cursorY = originY + 200 * C
                              + 100 * deltaTS;
            if(leafImg.complete){
                let width = size;
                let height = size * (leafImg.height / leafImg.width);
                context.save();
                context.translate(cursorX, cursorY);
                context.font = '32px IBM Plex Sans Arabic';
                context.strokeStyle = 'rgba(179, 198, 213, 1)';
                let ts = Math.floor((lifeCycle - deltaTS)*10)/10;
                context.textAlign = 'center';
                context.strokeText(ts , 0, -150);
                context.rotate(rotateNow);
                context.drawImage(leafImg, -width/2, -height/2, width, height);
                context.restore();
            }
            distanceX = (mouseX - cursorX);
            distanceY = (mouseY - cursorY);
        }
        else{
            if(timer >= 0){
                let linear = 1/period;
                let easeout = Math.pow(timer / period, 2) - Math.pow((timer-1) / period, 2);
                let easein = Math.pow(1 - (timer-1) / period, 2) - Math.pow(1 - timer / period, 2);
                let a = input.linear;
                let b = input.easein;
                let c = input.easeout;
                cursorX+= (a * linear + b * easein + c * easeout) * distanceX;
                cursorY+= (a * linear + b * easein + c * easeout) * distanceY;
            }
            context.drawImage(leafImg, cursorX-size/2, cursorY-size/2, size, size)
            timer--;
        }    
    }
    else if(leafImg.complete&&timer==0) context.drawImage(leafImg, cursorX-size/2, cursorY-size/2, size, size);
}