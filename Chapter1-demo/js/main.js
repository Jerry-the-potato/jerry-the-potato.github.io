
// main.js處理動畫模組

AnimationLoop();
function AnimationLoop(){
    requestAnimationFrame(Redraw);
    requestAnimationFrame(AnimationLoop);
}
function Redraw(){
    clear(context);
    CheckScreenSize();
    ProcessAudio();
}
let clear = function(context){
    // context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fill();
}
let CheckScreenSize = () => {
    if(WIDTH != window.innerWidth * RATIO || HEIGHT != window.innerHeight * RATIO){
        WIDTH = window.innerWidth * RATIO;
        HEIGHT = window.innerHeight * RATIO;
        resize("#game-box", canvas, context, WIDTH, HEIGHT, '#000');
    }
}
let ProcessAudio = () =>{
    let bands = audioCtx.sampleRate / analyserNode.fftSize; // 每個區段的頻寬
    const HighestBands = 8000; // 8kHz以下中音頻的音樂
    const index = HighestBands / bands;

    if(bufferLength != undefined){
        dataArray = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(dataArray);
        // dataArray = new Float32Array(bufferLength);
        // analyserNode.getFloatFrequencyData(dataArray);
        FrequencyVisualization(dataArray, index, window.shrink);
    }
    // else{FrequencyVisualization(new Array(256).fill(0), index, window.shrink);}
}
window.shrink = 3 + Math.floor(4000 / WIDTH);
window.thick = -10;
window.padding = 2 + Math.floor(4000 / WIDTH);
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