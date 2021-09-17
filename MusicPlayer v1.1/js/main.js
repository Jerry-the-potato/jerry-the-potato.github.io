// 事件監聽&動畫設定
// main.js處理觸控和操作介面(使用者交互)

let firstTime = true;
let audioCtx, myAudio, source;
let analyserNode, bufferLength, dataArray;
let List = new Array;
function PlayOn(bool) {
    if (bool == true) {
        if(firstTime == true){
            firstTime = false;
            //由於播放音樂需要透過用戶請求，當用戶"第一次"點擊時才建立音效物件
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            myAudio = document.getElementById("Music");
            source = audioCtx.createMediaElementSource(myAudio);
            console.log("Request confirm : preparing analyserNode");
        }
        //避免播放兩次
        if (document.getElementById("Music").paused == false) {
            console.log("Invalid move : it's playing now");
            return 0;
        }
        analyserNode = audioCtx.createAnalyser();
        source.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
    
        analyserNode.fftSize = 2048; // 從0-674為有效範圍
        bufferLength = analyserNode.frequencyBinCount;
        myAudio.play();
    }
    else {
        myAudio.pause();
    }
}
function SwitchSong(element) {
    document.getElementById("Music").src = "../music/" + element.value;
    Initial(); //換歌了，所以遊戲要重新開始
    try{
        document.getElementById("SongLocation").innerText = "audio: " + element.value;
    }catch(e){
        console.warn('無法顯示曲子名稱: document.getElementById("SongLocation") is null');
    }
}
function UploadSong(element) {
    try{
        URL.createObjectURL(element.files[0]);
    }catch(e){
        console.warn("無法建立此檔案之路徑: " + element.files[0]);
        return;
    }
    document.getElementById("Music").src = URL.createObjectURL(element.files[0]);

    // 可接受的附檔名
    let validExts = new Array(".wav", ".mp3", ".m4a");
    let fileExt = element.files[0].name.substring(element.files[0].name.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        document.getElementById("SongLocation").innerText = "檔案類型錯誤，可接受的副檔名有: " + validExts.toString();
        console.warn("檔案類型錯誤，可接受的副檔名有: " + validExts.toString());
        return;
    }

    Initial(); //換歌了，所以遊戲要重新開始
    try{
        document.getElementById("SongLocation").innerText = "已上傳成功: " + element.files[0].name;
    }catch(e){
        console.warn('無法顯示曲子名稱: document.getElementById("SongLocation") is null');
    }
}



let Volume, dV, ratioV; // 音量計算
let Volume2;
let volumeArray = new Array;
let volumeArray2 = new Array;
let keydownArray = new Array;
let Points = 0; // 分數計量
let Red = 0, Yellow = 0; // 此為特殊圖案的出線機率，單位%，平時緩慢上升，成功出現後歸零
let windX = 0, windY = 0;

class objAnimation{
	constructor(animeName=focusAnime,imgNumber=0,
                Xmin=0.4,Xmax=0.6,
                Ymin=0.4,Ymax=0.6,
                Smin=0.03,Smax=0.04,
                lifeCycle=focusLifeCycle,
                timestamp=Date.now()
    ){
        this.animeName = animeName;
        this.imgNumber = imgNumber;
        if(this.imgNumber == 0){this.imgNumber = Math.floor(Math.random()*4);}
        this.x = Math.random() * (Xmax - Xmin) + Xmin;
        this.y = Math.random() * (Ymax - Ymin) + Ymin;
        if(animeName == "Falling" || animeName == "Staring"){
            this.x = Math.random() * 1;
            this.y = Math.random() * 1;
        }
        this.pointX = this.x;
        this.pointY = this.y;
        this.s = Math.random() * (Smax - Smin) + Smin;
        this.size = 0;
        this.rotateOmega = 2 * Math.PI * (1/10 + Math.random() * (1/20));
        this.rotate = Math.floor(Math.random() * 360) / 180 * Math.PI;
        this.period = (1 + Math.random() * 1);
        this.revolve = Math.floor(Math.random() * 360) / 180 * Math.PI;
		this.timestamp = timestamp;
        this.lifeCycle = lifeCycle;
        this.alpha = Math.random() * 0.8 + 0.2;
	}
    NextFrame(){
        let deltaTS = (Date.now() - this.timestamp);

        if(this.animeName == "Floating") this.Floating(deltaTS);
        else if(this.animeName == "Falling") this.Falling(deltaTS);
        else if(this.animeName == "Staring") this.Staring(deltaTS);
        
        let rotate = this.rotate * 1 + this.rotateOmega * (deltaTS/1000);
        context.save();
        context.translate(this.pointX, this.pointY); //FallenImg2 平移
        context.rotate(rotate); //FloatImg3 正旋轉
        // var ScaleX = 1 - Math.abs((Vx * 2 + Vy) / 8), ScaleY = 1 - Math.abs((Vx + Vy) / 8);
        // context.scale(ScaleX / 0.8, ScaleY / 0.8); // 水平垂直變形
        if(this.imgNumber <= 3)    
            context.globalCompositeOperation = "destination-out";
        else
            context.globalCompositeOperation = "source-over";
        context.globalAlpha = this.alpha;
        if(pngImg[this.imgNumber] != undefined)
            context.drawImage(pngImg[this.imgNumber], 0, 0,
                              pngImg[this.imgNumber].width, pngImg[this.imgNumber].height,
                              -this.size / 2, -this.size / 2, this.size, this.size);
        context.restore();
    }
    Floating(deltaTS){
        const microsecond = 15000;
        let revolve = this.revolve + (((deltaTS) / microsecond * 2 * Math.PI)/this.period);
        let radius = (this.lifeCycle - deltaTS*0.7) / this.lifeCycle / (0.5 + 0.5 * this.period); // (0.3~1 / 1~1.5)
        this.pointX = WIDTH * this.x + radius * WIDTH/2 * Math.cos(revolve); // 對Vx積分
        this.pointY = HEIGHT * this.y + radius * HEIGHT/2 * Math.sin(revolve); // Vy積分
        if(focusGravity == "gravityOn"){
            this.pointX = this.pointX + windX * (deltaTS)/10 * Math.cos(revolve); //風的最大影響範圍(單位:像素)
            this.pointY = this.pointY + windY * (deltaTS)/10 * Math.sin(revolve);
        }
        const popSize = 0.2;
        this.size = WIDTH * this.s * ((1 + popSize) - Math.abs(deltaTS - this.lifeCycle/2) / (this.lifeCycle/2));
    }
    Falling(deltaTS){
        const microsecond = 6000;
        let revolve = this.revolve + (((deltaTS) / microsecond * 2 * Math.PI)/this.period);
        this.pointX = WIDTH * this.x + this.period * WIDTH * 0.04 * Math.sin(revolve); // 對Vx積分
        this.pointY = HEIGHT * this.y + this.period * HEIGHT * 0.03 * (deltaTS/1000) + this.period * HEIGHT * 0.02 * Math.cos(revolve/this.period); // Vy積分
        if(focusGravity == "gravityOn"){
            this.pointX = this.pointX - windX * (deltaTS)/10; //風的最大影響範圍(單位:像素)
            this.pointY = this.pointY - windY * (deltaTS)/10;
        }
        const popSize = 0.2;
        this.size = WIDTH * this.s * ((1 + popSize) - (Math.abs(deltaTS - this.lifeCycle*0.35) + Math.abs(deltaTS - this.lifeCycle*0.65)) /this.lifeCycle);
    }
    Staring(deltaTS){
        const microsecond = 10000;
        let revolve = this.revolve + (((deltaTS) / microsecond * 2 * Math.PI)/this.period);
        this.pointX = WIDTH * this.x + this.period * WIDTH * 0.02 * Math.sin(revolve); // 對Vx積分
        this.pointY = HEIGHT * this.y + this.period * HEIGHT * 0.01 * (deltaTS/1000) + this.period * HEIGHT * 0.004 * Math.cos(revolve); // Vy積分
        if(focusGravity == "gravityOn"){
            this.pointX = this.pointX + windX * (deltaTS)/10; //風的最大影響範圍(單位:像素)
            this.pointY = this.pointY + windY * (deltaTS)/10;
        }
        const popSize = 0.2;
        this.size = WIDTH * this.s * ((1 + popSize) - (Math.abs(deltaTS - this.lifeCycle*0.35) + Math.abs(deltaTS - this.lifeCycle*0.65)) /this.lifeCycle);
    }
    Vinishing(){
        let distance = Math.sqrt(Math.pow(cursorX - this.pointX, 2) + Math.pow(cursorY - this.pointY, 2));
        if (distance <  (cursorSize + this.size) * 0.5) {
            if(this.imgNumber == 4){ // 吃到黃色(獎勵)可以長大
                cursorPlus = cursorPlus + 1; //20 / (cursorSize + 1);
            }
            else if (this.imgNumber == 5) { // 吃到紅色(懲罰)會變小
                cursorPlus = cursorPlus - Math.floor((cursorPlus) / 3);
            }
            else { //吃到普通的會有一般分數
                Points = Points + Math.floor((cursorPlus) * (5 + cursorPlus / (WIDTH * 0.04)));
            }
            return true;
        }
        else if(Date.now() - this.timestamp > this.lifeCycle){
            return true;
        }
        else{
            return false;
        }
        
    }
}
objAnimation.prototype.test = function(){
    console.log("test sccuuced");
}

function AnimationLoop(){
    function Redraw(){
        context.globalAlpha = 1;
        context.globalCompositeOperation = "source-over";
        context.clearRect(0, 0, WIDTH, HEIGHT);
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fill();

        contextDev.clearRect(0, 0, WIDTH, HEIGHT);
        contextDev.beginPath();
        contextDev.rect(0, 0, canvas.width, canvas.height);
        contextDev.fillStyle = 'rgba(0, 0, 0, 1)';
        contextDev.fill();

        List.forEach(obj => obj.NextFrame());
        contextBG.beginPath();
        contextBG.rect(0, 0, WIDTH, HEIGHT);
        contextBG.fillStyle = Background.Transform();
        contextBG.fill();

        cursorX = (cursorX * 4 + mouseX) / 5; // (x, y) 是滑鼠在 canvas 中移動的座標
        cursorY = (cursorY * 4 + mouseY) / 5;
        cursorSize = WIDTH * 0.03 + cursorPlus * WIDTH * 0.001;
        context.globalAlpha = 1;
        if(MouseImg.complete)
        context.drawImage(MouseImg, 0, 0, MouseImg.width, MouseImg.height, cursorX - cursorSize / 2, cursorY - cursorSize / 2, cursorSize, cursorSize);
        //contextBG.clearRect(0,0,WIDTH,HEIGHT);
        context.font = (cursorSize / 4 + 10) + "px Comic Sans MS";
        context.fillStyle = "#DDAAAA";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("x" + Math.floor(cursorPlus) + "", cursorX, cursorY);

        if(bufferLength != undefined){
            dataArray = new Uint8Array(bufferLength);
            analyserNode.getByteFrequencyData(dataArray);
            
            // dataArray = new Float32Array(bufferLength);
            // analyserNode.gegetFloatFrequencyData(dataArray);
            FrequencyVisualization(dataArray);
            VolumeBasedImgMaker();
        }
        // context.font = "50px Comic Sans MS";
        // context.fillStyle = "white";
        // context.textAlign = "center";
        // context.textBaseline = "middle";
        // context.fillText("windX = " + Math.floor(windX*100) + ", windY = " + Math.floor(windY*100), WIDTH/2, HEIGHT/2);

        windX = windX + ((mouseX - WIDTH / 2) / (WIDTH / 2) - windX) / 50;
        windY = windY + ((mouseY - HEIGHT / 2) / (HEIGHT / 2) - windY) / 50;
    }
    function CheckList(){
        List.slice().reverse().forEach((obj, index, array) => {
            if(obj.Vinishing()){
                List.splice(array.length - 1 - index, 1);
            }
        })
    }
    let error;
    requestAnimationFrame(Redraw);
    requestAnimationFrame(CheckList);
    requestAnimationFrame(AnimationLoop);
}
function FrequencyVisualization(array){
    let relativeX1 = WIDTH*0.05;
    let relativeX2 = WIDTH*0.9;
    let WidthVisual = (relativeX2 - relativeX1) / 680;
    let relativeY1 = HEIGHT*0.9;
    let relativeY2 = HEIGHT*0.75;

    //平方根訊號減弱
    function Filter(num, exp, max) {
        num = Math.pow(num, exp) / Math.pow(max, exp - 1);
        if (num > max) {
            num = max;
        }
        return num;
    }

    dV = Volume; // 記下上次的音量
    Volume = 0; // 音量從 0 開始加總
    Volume2 = 0;
    const FOUR = 3;
    const THICK = 1/2;
    const INDEX = 674 - 674%FOUR;
    let frequency = [];
    for (let N = 0; N <= INDEX; N = N + FOUR) {
        frequency[N] = 0;
        for (let n = 0; n < FOUR; n++) {
            frequency[N + 0] = frequency[N + 0] + array[N + n] / FOUR;
            Volume = Volume + array[N + n] / INDEX; // 計算平均音量
            const RANGE = 256;
            if(N + n < RANGE)
                Volume2 = Volume2 + array[N + n] / INDEX; // 計算平均音量
        }
    }
    dV = Volume - dV; // dV 表示 音量的增減
    context.globalAlpha = 1;
    context.beginPath();
    context.lineTo(relativeX1, relativeY1 - 1);
    for (let N = 0 ; N <= INDEX; N = N + FOUR) {
        context.lineTo(relativeX1 + (N+0.2*FOUR) * WidthVisual, (relativeY1 - THICK) - 0);
        context.lineTo(relativeX1 + (N+0.2*FOUR) * WidthVisual, (relativeY1 - THICK) - Filter(frequency[N] / 2, 1, WidthVisual*50));
        context.lineTo(relativeX1 + (N+0.8*FOUR) * WidthVisual, (relativeY1 - THICK) - Filter(frequency[N] / 2, 1, WidthVisual*50));
        context.lineTo(relativeX1 + (N+0.8*FOUR) * WidthVisual, (relativeY1 - THICK) - 0);
    }

    context.lineTo(relativeX1 + INDEX * WidthVisual, relativeY1);
    for (let N = INDEX; N >= 0 ; N = N - FOUR) {
        context.lineTo(relativeX1 + (N+0.2*FOUR) * WidthVisual, (relativeY1 + THICK) + 0);
        context.lineTo(relativeX1 + (N+0.2*FOUR) * WidthVisual, (relativeY1 + THICK) + Filter(frequency[N] / 2, 1, WidthVisual*50));
        context.lineTo(relativeX1 + (N+0.8*FOUR) * WidthVisual, (relativeY1 + THICK) + Filter(frequency[N] / 2, 1, WidthVisual*50));
        context.lineTo(relativeX1 + (N+0.8*FOUR) * WidthVisual, (relativeY1 + THICK) + 0);
    }
    context.lineTo(relativeX1, (relativeY1 + 1) + Filter(frequency[0] / 2, 3, WidthVisual*0.1));
    context.fillStyle = Background.style;
    context.fill();

    if(developerKey == true){
        context.beginPath();
        context.rect(relativeX1, relativeY2, Volume, 50);
        context.fillStyle = Background.style;
        context.fill();
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = WIDTH * 0.015 + "px Comic Sans MS";
        context.fillText("Volume", relativeX1, (relativeY2 + 75));
        context.fillText("Point = " + Points + "", relativeX1, relativeY2 - 100);
        context.fillText("(R, Y) = " + Math.floor(Red) + ", " + Math.floor(Yellow), relativeX1, relativeY2 - 200);
    }
    if(developerKey == true){
        let relativeY3 = 0.4 * HEIGHT; 
        let relativeY4 = 0.1 * HEIGHT;
        contextDev.save();
        contextDev.beginPath();
        contextDev.lineTo(relativeX1, relativeY3);
        contextDev.lineTo(relativeX2, relativeY3);
        contextDev.translate(relativeX2, relativeY3);
        const arrowAngle = Math.PI * 0.2;
        const arrowline = 20; 
        contextDev.rotate(arrowAngle);
        contextDev.lineTo(-arrowline, 0);
        contextDev.rotate(-arrowAngle * 2);
        contextDev.lineTo(-arrowline, 0);
        contextDev.lineTo(0, 0);
        contextDev.strokeStyle = Background.style;
        contextDev.stroke();
        contextDev.restore();

        contextDev.save();
        contextDev.beginPath();
        contextDev.lineTo(relativeX1, relativeY3);
        contextDev.lineTo(relativeX1, relativeY4);
        contextDev.translate(relativeX1, relativeY4);
        contextDev.rotate(arrowAngle);
        contextDev.lineTo(0, arrowline);
        contextDev.rotate(-arrowAngle * 2);
        contextDev.lineTo(0, arrowline);
        contextDev.lineTo(0, 0);
        contextDev.strokeStyle = Background.style;
        contextDev.stroke();
        contextDev.restore();

        let VolumeVisualization = (array, volume, style) => {
            array.push(volume*3);
            if(array.length > 1000){
                array.splice(0, 1);
            }
            contextDev.beginPath();
            for(let N = array.length - 1; N>=0; N--){
                contextDev.lineTo(relativeX1 + (array.length - 1 - N) / 1000 *(relativeX2 - relativeX1), relativeY3 - array[N]);
                //contextDev.lineTo(relativeX1, relativeY3);
            }
            
            contextDev.strokeStyle = style;
            contextDev.stroke();
        }
        VolumeVisualization(volumeArray, Volume, Background.style);
        VolumeVisualization(volumeArray2, Volume2, '#FFDDAA');
        VolumeVisualization(keydownArray, 0 , 'rgba(255, 255, 255, 0.5)');
    }

    
}
function VolumeBasedImgMaker(){

    function Rate(num, time) { //初始值給0，就能根據貝氏機率得到 0~3 的數字
        if (num > Math.random() * 100) {
            time++;
            if(time < 3){
                time = Rate(num, time);
            }
        }
        return time;
    }
    ratioV = dV * 5.5 * Math.pow(Volume, 0.3)/Volume;
    //console.log(5.5 * Math.pow(Volume, 0.3)/Volume);
    if (ratioV > 1) {
        Red = Red * 0.9 + 3;
        RedN = Rate(Red, 0);
        Yellow = Yellow * 0.9 + 5;
        YellowN = Rate(Yellow, 0);
        for (N = Math.pow(1 + ratioV*6, 0.3) ; N > RedN + YellowN; N--) {
            List.push(new objAnimation(focusAnime, 0));
        }
        for (N = YellowN; N > 0; N--) {
            List.push(new objAnimation(focusAnime, 4));
            Yellow = 0;
        }
        for (N = RedN; N > 0; N--) {
            List.push(new objAnimation(focusAnime, 5));
            Red = 0;
        }
    }


}