
// main.js處理動畫模組
let ts = Date.now();
let Start_CSS = window.getComputedStyle(Start);
let minWidth = Math.floor(Start_CSS.width.substring(0, Start_CSS.width.lastIndexOf("p")));
let loadingAnime = requestAnimationFrame(LoadingScreen);
let openingAnime, GamingAnime;
let I = 0;
function LoadingScreen(){
    try{
        Resize("#game-box", canvas, context, '#000');
        clear(context);
        
        // 1. 讓樹長出來
        treeGrowth.NextFrame(1, -1, 3);
        myTree.Transform();
        myTree.Draw();
        
        // 2. 讀取進度條
        if(loading.timer > 0){
            loading.NextFrame(1, 0, 2);
            let percent = Math.floor(loading.pointX * 100);
            Start.style.width = minWidth + percent + "px";
            Start.textContent = percent + "%";
        }
        else if(Start.disabled == true){
            Start.textContent = "Start";
            Start.disabled = false;
        }
         
        // 3. 選單淡入
        if(opacity.timer > 0){
            opacity.NextFrame(1, 0, 2);
            let header = document.getElementsByTagName("header")[0];
            header.style.opacity = opacity.pointX;
        }
        // I++;
        // if(I%7 == 0 || I%5 ==0){
        //     new animeObject(0, 'Falling');
        // }
        AnimeProcess();
        AudioProcess();

    }catch(e){
        console.log(e);
        return;
    }
    loadingAnime = requestAnimationFrame(LoadingScreen);
}
function OpeningScreen(){
    try{
        Resize("#game-box", canvas, context, '#000');
        clear(context);

        // 1. 選單淡出
        if(opacity.timer > 0){
            opacity.NextFrame(1, 0, 2);
            let header = document.getElementsByTagName("header")[0];
            header.style.opacity = opacity.pointX;
        }

        let x = camera.pointX * WIDTH;
        let y = camera.pointY * HEIGHT * 1;
        context.translate(x, y);
        myTree.Transform();
        myTree.Draw();
        context.translate(-x, -y);
        // 2. 運鏡
        if(camera.timer > 0){
            if(camera.period == 120){
                camera.NextFrame(1, 1.5, 0);
            }
            else if(camera.period == 121){
                camera.NextFrame(1, 0, 1);
            }
            else if(camera.period == 122){
                camera.NextFrame(1, 1.5, 0);
            }
            else if(camera.period == 123){
                camera.NextFrame(1, 0, 1.5);
            }
        }
        else if(camera.period == 120){
            camera.NewTarget(0, 1, 121);
        }
        else if(camera.period == 121){
            camera.NewTarget(-0.3, 0.2, 122);
        }
        else if(camera.period == 122){
            camera.NewTarget(0, 0.6, 123);
        }
        else{
            audio.currentTime = 0;
            audio.play();
            gameScores = 0;
            lifePoint = leafNodes.length;
            GamingAnime = requestAnimationFrame(GamingScreen);
            return;
        }
    }catch(e){
        console.log(e);
        return;
    }
    openingAnime = requestAnimationFrame(OpeningScreen);
}
function GamingScreen(){
    try{
        Resize("#game-box", canvas, context, '#000');
        Redraw();
        if(audio.ended){
            if(true){
                header.style.pointerEvents = "auto";
                startScreen.style.display = "block";
                myTree = new Tree(WIDTH/2, 0.8 * HEIGHT, HEIGHT/6, 90, maxTimes);
                loadingAnime = requestAnimationFrame(LoadingScreen);
                return;
            }
        }
    }catch(e){
        console.log(e);
        return;
    }
    if(audio.paused) return;
    requestAnimationFrame(GamingScreen);
    // RATIO = 1.505 - 0.445 * Math.sin(Math.PI/4 * (Date.now()-ts)/1000);
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
        context.lineCap = lineCap[1];
    }
}
function Redraw(){
    clear(context);
    AudioProcess();
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    let x = camera.pointX * WIDTH - 0 * (myMouse.pointX - 0.5 * WIDTH) * 0.1;
    let y = camera.pointY * HEIGHT - (myMouse.pointY - 0.5 * HEIGHT) * 0.1;
    context.translate(x, y);
    myTree.Transform();
    myTree.Draw();
    AnimeProcess();
    context.translate(-x, -y);
    MouseAnime();
    context.font = WIDTH * 0.015 + 'px IBM Plex Sans Arabic';
    context.strokeStyle = 'rgba(179, 198, 213, 1)';
    context.lineWidth = 3;
    // context.textAlign = 'center';
    context.strokeText("分數: " + Math.floor(gameScores/RATIO), WIDTH * 0.55, HEIGHT * 0.85);
    context.strokeText("生命值: " + leafNodes.length + " / " + lifePoint, WIDTH * 0.55, HEIGHT * 0.90);
}
function clear(context){
    // context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.fill();
}
function MouseAnime(){
    freeMouse.NextFrame();
    myMouse.NextFrame();
    animeList.forEach(obj => {
        obj.rotateOmega = freeMouse.pointX * 40 / obj.period / 180 * Math.PI;
        if(mode == 'Free'){
            obj.scaleX = 1 + freeMouse.pointX/2;
            obj.scaleY = 1 + freeMouse.pointY/2;
        }
    })
}
function AnimeProcess(){
    animeList.forEach(obj => obj.NextFrame());
}


window.shrink = 1;//4 + Math.floor(4000 / WIDTH);
window.thick = -1;
window.padding = 0.8;//3 + Math.floor(4000 / WIDTH);
function AudioProcess(bands = audioCtx.sampleRate / analyserNode.fftSize * 2,
                      highestBands = 16000, // 每個區段的頻寬
                      index = highestBands / bands // 16kHz高音頻以下的音樂
                      ){
    const INDEX = index - index % window.shrink;
    bufferLength = analyserNode.frequencyBinCount;
    if(bufferLength != undefined){
        dataArray.next = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(dataArray.next);

        dataArray.next = ReArray(dataArray.next, INDEX, window.shrink);
        dataArray.delta = dataArray.next.map((value,index) => { return value - dataArray.pre[index];});
        dataArray.volume.splice(dataIndex.volume, 1, dataArray.delta.reduce((a,b) => a+b, 0));

        // 陣列最大長度到 INDEX 為止
        (dataIndex.volume > INDEX) ? dataIndex.volume = 0 : dataIndex.volume++;
        let maxDelta = dataArray.delta.reduce((a,b) => Math.max(a,b), 50);
        let maxVolume = dataArray.volume.reduce((a,b) => Math.max(a,b), 1);
        
        // 旋律響起之時，音符便躍出紙面
        let v1 = dataArray.volume[dataIndex.volume - 1];
        let v2 = dataArray.volume[dataIndex.volume - 2];
        let v3 = dataArray.volume[dataIndex.volume - 3];
        if(v1 > 0 && v2 > 0 && v3 <= 0){
            let times = 100 * Math.max(v1, v2) / maxVolume; // 100乘上一個0~1之間的數
            // animeList.push(new animeObject(times * 0.3, 'Floating'));
            new animeObject(times * 0.3, 'Falling');
            // animeList.push(new animeObject(times * 0.3, 'Staring'));
        }

        // FrequencyVisualization(dataArray.next, INDEX, window.shrink, 0.85, 0.08, 255);
        // FrequencyVisualization(dataArray.delta, INDEX, window.shrink, 0.6, 0.08, maxDelta);
        // FrequencyVisualization(dataArray.volume, INDEX, window.shrink, 0.35, 0.1, maxVolume);

        // PaintIndex(dataIndex.volume, INDEX, 0.35, 0.1);

        // 淺拷貝陣列
        dataArray.pre = dataArray.next.map(value=>value);
    }
    else{
        FrequencyVisualization(new Array(1024).fill(0), INDEX, window.shrink, 0.85, 0.08, 255);
        FrequencyVisualization(new Array(1024).fill(0), INDEX, window.shrink, 0.6, 0.08, maxDelta);
        FrequencyVisualization(new Array(1024).fill(0), INDEX, window.shrink, 0.35, 0.1, maxVolume);
    }

    // functions
    function ReArray(array, index, shrink){
        let volume = 0; // 音量從 0 開始加總
        let newArray = new Array();
        for (let N = 0; N <= index; N = N + shrink) {
            newArray[N] = 0;
            for (let n = 0; n < shrink; n++) {
                newArray[N + 0] = newArray[N + 0] + array[N + n] / shrink;
                volume = volume + array[N + n] / index; // 計算平均音量
                // const RANGE = 256;
                // if(N + n < RANGE)
                //     Volume2 = Volume2 + array[N + n] / INDEX; // 計算平均音量
            }
        }
        return newArray;
    }
    function FrequencyVisualization(dataArray, index, shrink, middle, height, max){
        ChartArray(context, dataArray, WIDTH*0.1, WIDTH*0.9, HEIGHT*middle, HEIGHT*height, max);

        function ChartArray(context, array, left, right, middle, height=255, max=height){
            const WIDTH = (right - left) / (index + 1);
            const THICK = window.thick;
            const PADDING = window.padding;
            context.globalAlpha = 1;
            context.fillStyle = Background.Transform(2, 1);
            context.strokeStyle = Background.Transform(0, 0.4);
            max = max / (1 + 0);
            for (let N = 0 ; N <= index; N = N + shrink) {
                let value = (array[N] == 0) ? 0 : ((array[N] > 0) ? Math.pow((array[N] / max), 1 + 0) : -Math.pow((-array[N] / max), 1 + 0  ));
                value = (value > 1) ? 1 : value;
                context.fillRect(left + (N) * WIDTH, middle, PADDING * WIDTH, -(THICK + value * height));
                context.strokeRect(left + (N) * WIDTH, middle, PADDING * WIDTH,   THICK + value * height);
            }
            context.font = '32px IBM Plex Sans Arabic';
            for(let N = 0; N <= index; N = N + 60){
                context.fillText(N/60, left + (N) * WIDTH, middle + height);
            }
            context.fillText(max, left, middle - height);
            // context.strokeRect(left, middle - 100/255*height, (right - left), 200/255*height);
        }
    }
    function PaintIndex(index, INDEX, middle, height, left=WIDTH*0.1, right=WIDTH*0.9){
        height = HEIGHT * height;
        middle = HEIGHT * middle;
        let width = (right - left) / (INDEX+window.shrink);
        let gap = 60;
        // let style = context.createLinearGradient(left + (index) * width, 0, left + (gap+index) * width, 0);
        //     style.addColorStop(0.1,'rgba(0,0,0,1)');
        //     style.addColorStop(1,'rgba(0,0,0,0.2)');
        context.fillStyle = 'rgba(0,0,0,0.7)';
        if(index + gap > INDEX){
            context.fillRect(left + (index) * width, middle - height, (INDEX-index) * width, height * 2);
            context.fillRect(left + (0) * width, middle - height, (gap - (INDEX-index)) * width, height * 2);
        }
        else context.fillRect(left + (index) * width, middle - height, gap * width, height * 2);

    }
}