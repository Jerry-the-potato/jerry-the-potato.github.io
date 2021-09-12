
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
    clear(context);
    AudioProcess();
}
function clear(context){
    // context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fill();
}
function AudioProcess(){
    let bands = audioCtx.sampleRate / analyserNode.fftSize * 2; // 每個區段的頻寬
    let HighestBands = 16000; // 16kHz高音頻以下的音樂
    let index = HighestBands / bands;
    bufferLength = analyserNode.frequencyBinCount;
    if(bufferLength != undefined){
        dataArray = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(dataArray);
        // dataArray = new Float32Array(bufferLength);
        // analyserNode.getFloatFrequencyData(dataArray);
        context.save();
        context.translate(WIDTH/2, HEIGHT/2);
        // context.transform(1, (1-a)*b, a*(1-b), 1, 0, 0);
        // context.transform(a, 0, 0, b, 0, 0);
        context.translate(-WIDTH/2, -HEIGHT/2);
        FrequencyVisualization(dataArray, index, window.shrink);
        context.restore();
    }
    else{FrequencyVisualization(new Array(1024).fill(0), index, window.shrink);}
}
window.shrink = 4 + Math.floor(4000 / WIDTH);
window.thick = -10;
window.padding = 3 + Math.floor(4000 / WIDTH);
function FrequencyVisualization(dataArray, index, shrink){
    const INDEX = index - index%shrink;
    ChartArray(context, ReArray(dataArray), WIDTH*0.05, WIDTH*0.9, HEIGHT*0.6, HEIGHT*0.2);
    function ReArray(array){
        let volume = 0; // 音量從 0 開始加總
        let newArray = new Array();
        for (let N = 0; N <= INDEX; N = N + shrink) {
            newArray[N] = 0;
            for (let n = 0; n < shrink; n++) {
                newArray[N + 0] = newArray[N + 0] + array[N + n] / shrink;
                volume = volume + array[N + n] / INDEX; // 計算平均音量
                // const RANGE = 256;
                // if(N + n < RANGE)
                //     Volume2 = Volume2 + array[N + n] / INDEX; // 計算平均音量
            }
        }
        return newArray;
    }
    function ChartArray(context, array, left, right, middle, height=255){
        const WIDTH = (right - left) / INDEX;
        const THICK = window.thick;
        const PADDING = window.padding;
        context.globalAlpha = 1;
        context.fillStyle = Background.Transform(1.5);
        context.strokeStyle = Background.Transform(1.5);
        for (let N = 0 ; N <= INDEX; N = N + shrink) {
            context.fillRect(left + (N) * WIDTH, middle, PADDING * WIDTH, -(THICK + array[N] / 255 * height));
            context.strokeRect(left + (N) * WIDTH, middle, PADDING * WIDTH,   THICK + array[N] / 255 * height);
        }
    }
}