var count = 0, Co = 0, N = 0, n = 0, AI = 0; // for 迴圈使用
var Volume, dV; // 音量計算
var Points = 0; // 分數計量
var Red = 0, Yellow = 0; // 此為特殊圖案的出現機率，單位%，平時緩慢上升，成功出現後歸零
var pageX = 0, pageY = 0, X = [], Y = [], x = 0, y = 0;
var MouseX = 0, MouseY = 0;
for (N = 0 ; N < 5; N++) {
    X[N] = 150;
    Y[N] = 150;
}
var mousekey = false; //判斷是否(滑鼠長壓)
var mapkey = false;
var TestKey = 0; // 1表示T, 0表示F
var StarKey1 = 1, FallKey2 = 0, ScaleKey6 = 1, BubbleKey4 = 0; // 1表示T, 0表示F
var RulerKey5 = 0, TheaKey3 = 0;
var WindX = 0, WindY = 0, WindStatusX = 0, WindStatusY = 0;
var WindX2 = 0, WindY2 = 0, Rotate = 0;
var animekey = [];
var mapmode = -1;
var count = 0, plus = 0.001;
class Picture {
    constructor() {
        this.x = []
        this.y = []
        this.V = []
        this.Vt = []
        this.Vx = []
        this.Vy = []
        this.theta = []
        this.size = []
        this.pic = []
        this.ms = []
        this.Xmin = 0 + 50
        this.Xmax = 1500 - 50
        this.Ymin = 0 + 50
        this.Ymax = 820 - 50
        this.Smin = 45
        this.Smax = 80
    }
    Cut(PicClass, spot) { //將陣列從spot處分開，並回傳後半段被切割掉的部分
        PicClass.x = this.x.splice(spot)
        PicClass.y = this.y.splice(spot)
        PicClass.V = this.V.splice(spot)
        PicClass.Vt = this.Vt.splice(spot)
        PicClass.Vx = this.Vx.splice(spot)
        PicClass.Vy = this.Vy.splice(spot)
        PicClass.theta = this.theta.splice(spot)
        PicClass.size = this.size.splice(spot)
        PicClass.pic = this.pic.splice(spot)
        PicClass.ms = this.ms.splice(spot)
    }
    Push(PicClass, spot, num) {
        this.x.push(PicClass.x.splice(spot,num))
        this.y.push(PicClass.y.splice(spot,num))
        this.V.push(PicClass.V.splice(spot,num))
        this.Vt.push(PicClass.Vt.splice(spot,num))
        this.Vx.push(PicClass.Vx.splice(spot,num))
        this.Vy.push(PicClass.Vy.splice(spot,num))
        this.theta.push(PicClass.theta.splice(spot,num))
        this.size.push(PicClass.size.splice(spot,num))
        this.pic.push(PicClass.pic.splice(spot,num))
        this.ms.push(PicClass.ms.splice(spot,num))
    }
    Random(currentMs, pic, X1,X2,Y1,Y2,S1,S2,VX,VY) {
        if (Y2 != undefined) {
            this.Xmin = X1;
            this.Xmax = X2;
            this.Ymin = Y1;
            this.Ymax = Y2;
        }
        if (S1 != undefined) {
            this.Smin = S1;
            this.Smax = S2;
        }
        if (VX != undefined) {
            this.Vx.push(VX);
            this.Vy.push(VY);
        }
        else {
            this.Vx.push(0.5);
            this.Vy.push(1);
        }
        this.x.push(Math.floor(Math.random() * (this.Xmax - this.Xmin) + this.Xmin)); //from 0 to 1500
        this.y.push(Math.floor(Math.random() * (this.Ymax - this.Ymin) + this.Ymin)); //from 0 to 820
        this.V.push( 1 + Math.random() * 1);
        this.Vt.push( Math.floor(Math.random() * 360) / 180 * Math.PI);
        this.theta.push( Math.floor(Math.random() * 360) / 180 * Math.PI);
        this.size.push( Math.floor(Math.random() * (this.Smax - this.Smin)) + this.Smin);
        //if (pic == 0) { //隨機圖樣
            this.pic.push( Math.floor(Math.random() * pic) + 1);
        //}
        //else { //指定圖樣
         //   this.pic.push( pic);
        //}
        this.ms.push(currentMs); //相對起點的時間刻度
    }
    MouseEffect() {
        this.x.push(MouseX);
        this.y.push(MouseY);
        this.V.push();
        this.Vt.push();
        this.theta.push();
        this.size.push();
    }
}
var image1 = new Image(); // 定義image1元素
var image2 = new Image();
var image3 = new Image();
var image4 = new Image();
image1.src = "../images/pic/Leave2O.png";
image2.src = "../images/pic/Leave2R.png";
image3.src = "../images/pic/LeaveSR.png";
image4.src = "../images/pic/LeaveSY.png";
var Sparkle1 = new Image();
var Sparkle2 = new Image();
var Sparkle3 = new Image();
var Heart1 = new Image();
var Heart2 = new Image();
var Heart3 = new Image();
Sparkle1.src = "../images/pic/Sparkle1.png";
Sparkle2.src = "../images/pic/Sparkle2.png";
Sparkle3.src = "../images/pic/Sparkle3.png";
Heart1.src = "../images/pic/Heart (1).png";
Heart2.src = "../images/pic/Heart (2).png";
Heart3.src = "../images/pic/Heart (3).png";
var SceneA = new Image();
var SceneB = new Image();
var SceneC = new Image();
var SceneD = new Image();
SceneA.src = "../images/background/7-A.jpg";
SceneB.src = "../images/background/7-B.jpg";
SceneC.src = "../images/background/7-C.jpg";
SceneD.src = "../images/background/7-D.jpg";
var StarImg1 = new Picture();
var FallenImg2 = new Picture();
var FloatImg3 = new Picture();
var FallMs = 0, FloatMs = 0;
var imgMouse = new Picture();
function Initial() {
    img1 = new Picture();
    img2 = new Picture();

    imgMouse = new Picture();
    for (N = 0; N < 165 * 3; N = N + 2) {
        StarImg1.Random(0 + (N + Math.random() * 1) * 1000 / 3, 4, 200, 1300, 140, 740, 25, 45);
        StarImg1.Random(0 + (N + Math.random() * 1) * 1000 / 3, 4, 200, 1300, 1000, 1500, 25, 45);
        FallenImg2.Random(0 + (N + Math.random() * 1) * 1000 / 3, 3, -250, 750, 0, 700,30,50,0.5,1);
        FallenImg2.Random(0 + (N + Math.random() * 1) * 1000 / 3, 3, 750, 1750, 0, 700, 30, 50, 0.5, 1);
        FloatImg3.Random(0 + (N + Math.random() * 1) * 1000 / 3, 4, 260, 1260, 420, 420, 25, 38, 0.5, 0.5);
    }
    Rotate = 0;
}

class MOUSE {
        constructor() {
            this.x = 0
            this.y = 0
        }
    }
const mouse = new MOUSE();
var TLx = 50, TLy = 700;
var TimeLine;
var LP = [], LNew = -1;
var Scene = 0, PreScene = 0, SceneMs = 0, SceneTrans = 0;
var SceneKey = false, SceneTo = 0, KeyLock = 0;
var clickms = 0;
function PlayNext(Cms) {
    if (LNew < 0) {
        LNew = 0;
        LP.push(LNew);
        AnimeLyric.ms[LNew] = Cms;
        AnimeLyric.Anime[LNew].play();
    }
    else {
        //var L = document.getElementById('L' + LP);
        //L.style.strokeOpacity = 0; //直接消除
        //AnimeLyric.Anime[LP].stop(); //直接暫停 避免呼叫callback,誤用新的LP
        LNew++;
        if (AnimeLyric.Anime[LNew] != undefined) {
            LP.push(LNew);
            AnimeLyric.ms[LNew] = Cms;
            AnimeLyric.Anime[LNew].play();
        }
    }
}
function BackTrack() {
    LNew--;
    if (LNew < -1) {
        LNew = -1
    }
    for (n = 0; n < LP.length; n++) {
        var P = LP[n];
        if (AnimeLyric.Anime[P] != undefined) {
            AnimeLyric.Anime[P].play(-5);
        }
    }
    LP = [];
}
window.onload = function () { //初始畫面
    Initial(); //初始化某些參數
    //Start(); //動畫待命

}

function AutoUpdate() {
    var canvas = document.getElementById("map");
    var context = canvas.getContext("2d");

    var canvasUnseen = document.getElementById("mapUnseen");
    var contextT = canvasUnseen.getContext("2d");

    var lineCap = ['butt', 'round', 'square'];
    context.lineCap = lineCap[1];
    contextT.lineCap = lineCap[1];

    // 先清空
    //canvas.height = canvas.height;
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    contextT.clearRect(0, 0, WIDTH, HEIGHT);

    //尺標
    if (RulerKey5 == 1) {
        var R1 = 200, R2 = 350, R3 = 600;

        context.strokeStyle = '#555555';
        context.lineWidth = 1;

        context.beginPath();
        context.arc(WIDTH / 2, HEIGHT / 2, R1, 0, 2 * Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(WIDTH / 2, HEIGHT / 2, R2, 0, 2 * Math.PI);
        context.stroke();

        context.beginPath();
        context.arc(WIDTH / 2, HEIGHT / 2, R3, 0, 2 * Math.PI);
        context.stroke();

        context.rect(WIDTH / 2 - R3, HEIGHT / 2 - R3, R3 * 2, R3 * 2);
        context.rect(WIDTH / 2 - R2, HEIGHT / 2 - R2, R2 * 2, R2 * 2);
        context.rect(WIDTH / 2 - R1, HEIGHT / 2 - R1, R1 * 2, R1 * 2);
        context.stroke();
        
        context.fillStyle = "#555555"
        context.font = "20px Microsoft YaHei UI";
        context.fillText("R=" + R1, WIDTH / 2 - R1 +5, HEIGHT / 2 + R1 - 10);
        context.fillText("R=" + R2, WIDTH / 2 - R2+5, HEIGHT / 2 + R2 - 10);
        context.fillText("R=" + R3, WIDTH / 2 - R3+5, HEIGHT / 2 + R3 - 10);
    }

    //context.lineTo(0, HEIGHT/3, WIDTH, HEIGHT/3);
    //context.lineTo(0, HEIGHT/1.5, WIDTH, HEIGHT/1.5);

    //context.lineTo(WIDTH/3, 0, WIDTH/3, 0);
    //context.lineTo(WIDTH/1.5, 0, WIDTH/1.5, 0);

    var HLG = context.createLinearGradient(104, 300, 1444, 300);
    if (true) { //全彩、明亮色系
        HLG.addColorStop(0, 'rgba(255,0,0,1)');
        HLG.addColorStop(0.167, 'rgba(255,255,0,1)');
        HLG.addColorStop(0.333, 'rgba(0,255,0,1)');
        HLG.addColorStop(0.5, 'rgba(0,255,255,1)');
        HLG.addColorStop(0.667, 'rgba(0,0,255,1)');
        HLG.addColorStop(0.833, 'rgba(255,0,255,1)');
        HLG.addColorStop(1, 'rgba(255,0,0,1)');
    }

    if (play == true) { //當處於播放中，時間(ms)才會流動
        ms = new Date() - StartMs;

        count++;
        if (count > 10 + Co) {
            count = 0;
            Co = Math.random() * 10 - 5;
        }


        while (img2.ms[0] < ms) {
            img1.Push(img2, 0, 1);
            log.push("尚有"+ img2.ms.length +"片雪花");
        }
    }

    var TopContext = document.getElementById("mapUnseen");

    // 動畫時間軸
    if (true) { //True表示要繼續播放 //有可能 play = false 但是希望畫面能實時更新
        if (SceneTo > 0) {

            for (n = 0; n < LP.length; n++) {
                var P = LP[n];
                AnimeLyric.Anime[P].play(-5);
            }
            LP = [];
            if (SceneTo == 1) { //B
                PreScene = 'B';
                SceneMs = ms + 2000;
                SceneTrans = 2000;
            }
            else if (SceneTo == 2) { // C
                PreScene = 'C';
                SceneMs = ms + 2000;
                SceneTrans = 2000;
            }
            else if (SceneTo == 3) { // D
                PreScene = 'D';
                SceneMs = ms + 2000;
                SceneTrans = 2000;
            }
            SceneTo = 0;
        }
        if (LP != undefined) {

            var P = LP[0];
            // 只檢查最舊的文字動畫，依序消除，避免有漏網之魚
            if (ms > AnimeLyric.ms[P] + AnimeLyric.count[P]) {
                AnimeLyric.Anime[P].play(-2.2);
                LP = LP.splice(1);
                console.log(P);
                if (P == 8) { //B
                    PreScene = 'B';
                    SceneMs = ms + 3000;
                    SceneTrans = 3000;
                    //SceneKey = true; //當SceneMs 小於 ms時，會觸發SceneKey
                }
                else if (P == 15) { // C
                    PreScene = 'C';
                    SceneMs = ms + 3000;
                    SceneTrans = 3000;
                    //SceneKey = true; //當SceneMs 小於 ms時，會觸發SceneKey
                }
                else if (P == 21) { // DE
                    PreScene = 'D';
                    SceneMs = ms + 3000;
                    SceneTrans = 3000;
                    //SceneKey = true; //當SceneMs 小於 ms時，會觸發SceneKey
                }
            }
            for (n = 0; n < LP.length; n++) {
                P = LP[n];
                if (AnimeLyric.Anime[P] == undefined) {
                    break;
                }
                var Ams = AnimeLyric.ms[P];
                if (ms > Ams && ms < Ams + 2000) {
                    var t = (ms - Ams) / 2000; // 0 < t < 1
                    var L = document.getElementById('L' + P);
                    L.style.strokeOpacity = 0.2 + 0.8 * (t * 2 - t * t);
                    L.style.fillOpacity = 0.2 * (t * 2 - t * t);
                }

            }
        }
    }


    //if (Scene == 'FG') {
        //Rotate = Rotate - 1 / 10000;
    //}
    Rotate = Rotate - 1 / 10000;//(WindX2 / 1000);
    //背景圖
    
    context.save();
    if (Scene == 'A') {
        context.drawImage(SceneA, 0, 0, 1520, 840, 0, 0, 1520, 840);
    }
    else if (Scene == 'B') {
        context.drawImage(SceneB, 0, 0, 1520, 840, 0, 0, 1520, 840);
    }
    else if (Scene == 'C') {
        context.drawImage(SceneC, 0, 0, 1520, 840, 0, 0, 1520, 840);
    }
    else if (Scene == 'D') {
        context.drawImage(SceneD, 0, 0, 1520, 840, 0, 0, 1520, 840);
    }

    context.restore();

    if (TestKey == 1) {
        context.font = "30px Microsoft YaHei UI";
        context.fillStyle = "#000C0E";
        context.fillText("WindX  " + Math.floor(WindX * 1000) / 1000, 200, 600);
        context.fillText("WindY  " + Math.floor(WindY * 1000) / 1000, 200, 650);
        context.fillText("WindX2 " + Math.floor(WindX2 * 1000) / 1000, 200, 700);
        context.fillText("WindY2 " + Math.floor(WindY2 * 1000) / 1000, 200, 750);
        context.fillText("Pic    " + LNew, 200, 800);

    }

    var theta, size, Vt, Vx, Vy, Ix, Iy, pic;

    //背景動畫
    if (StarKey1 == 1) {
        for (N = 0; N < StarImg1.ms.length; N++) {
        var delms = (ms - StarImg1.ms[N]) / 33;
        if (delms > 200) {

        }
        else if (delms > 0) {
            //資料轉存時，會從數字變成字串，因此在計算時，'+'會被當作字串相接，必須先用其他運算子把字串變成數字
                size = StarImg1.size[N] * (1- Math.abs(delms - 50) / 150);
                var C = StarImg1.size[N] / 2;
                context.save();
                context.translate(760, 840);
                context.rotate(Rotate * 2 * Math.PI);
                context.translate(StarImg1.x[N] - 760, StarImg1.y[N] - 840);
                if (ScaleKey6 == 1) {
                    context.transform((cos + sin) / 2, (cos + sin) / 2, (-cos - sin) / 2, (cos + sin) / 2, 0, 0);
                }
                switch (StarImg1.pic[N] * 1) { // 陷阱:如果pic資料型態為字串，那case取數字就會出問題
                    case 1:
                        context.drawImage(Sparkle1, 0, 0, 800, 800, -C, -C, size, size); //畫出來囉~
                        break;
                    case 2:
                        context.drawImage(Sparkle2, 0, 0, 800, 800, -C, -C, size, size); //畫出來囉~
                        break;
                    case 3:
                        context.drawImage(Sparkle3, 0, 0, 800, 800, -C, -C, size, size); //畫出來囉~
                        break;
                    case 4:
                        var sin = Math.sin(2 * Math.PI / 200 * (delms));
                        var cos = Math.cos(2 * Math.PI / 200 * (delms));
                        //context.drawImage(image5, 0, 0, 200, 200, -C, -C, StarImg1.size[N]/10, StarImg1.size[N]/10);
                        context.beginPath();
                        var outerR = (StarImg1.size[N] - (StarImg1.size[N] * Math.abs(delms - 50) / 150)) / 10; // delms從1~200 共200偵 6.6秒
                        var innnerR = (StarImg1.size[N] - (StarImg1.size[N] * Math.abs(delms - 50) / 150)) / 20;
                        for (var i = 0; i < 5; i++) {
                            context.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * outerR + x, -Math.sin((18 + i * 72) / 180 * Math.PI) * outerR + y);
                            context.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * innnerR + x, -Math.sin((54 + i * 72) / 180 * Math.PI) * innnerR + y);
                        }
                        context.fillStyle = "rgba(255,250,245,1)";
                        context.fill();
                }
                if (BubbleKey4 == 1) {
                    context.beginPath();
                    context.arc(0, 0, size, 0, 2 * Math.PI);
                    context.strokeStyle = "rgba(255,200,220,0.2)";
                    context.stroke();
                }
                context.restore();
            }
        }
    }

    //背景遮罩

    //上層飄落物
    if (TheaKey3 == 1) {

        for (N = 0; N <FloatImg3.ms.length; N++) {
            var delms = (ms - FloatMs - FloatImg3.ms[N]) / 33;
            if (delms > 1000) {

            }
            else if (delms > 0) {
                //資料轉存時，會從數字變成字串，因此在計算時，'+'會被當作字串相接，必須先用其他運算子把字串變成數字
                theta = FloatImg3.theta[N] * 1 + spin * delms; // 旋轉 spin = 0.025
                size = FloatImg3.size[N] * (1 - Math.abs(delms - 500) / 540);
                Vt = (delms + 100) / 300 * Math.PI; // 速度 Vel = 0.05

                Ix = FloatImg3.x[N] * 1 + (1600 - delms) / 800 * FloatImg3.Vx[N] * FloatImg3.V[N] * 250 * Math.cos(FloatImg3.Vt[N] + (1/FloatImg3.V[N]) * Vt); // 對Vx積分
                Iy = FloatImg3.y[N] * 1 + (1600 - delms) / 800 * FloatImg3.Vy[N] * FloatImg3.V[N] * 200 * Math.sin(FloatImg3.Vt[N] + (1/FloatImg3.V[N]) * Vt); //Vy積分

                WindX = WindX / Math.pow(2, 1 / 100);// 最大值1，每 50偵(1500毫秒) 減半，最終趨於0
                WindY = WindY / Math.pow(2, 1 / 100);
                WindX = WindX + ((mouse.x - 1500 / 2) / 750 - WindX) / 50;
                WindY = WindY + ((mouse.y - 820 / 2) / 410 - WindY) / 50;

                if (Scene == 'B') { WindX = 0.15; WindY = 0.03; }
                Ix = Ix + WindX * 10 * (delms) * Math.cos(FloatImg3.Vt[N] + (1 / FloatImg3.V[N]) * Vt); //風的最大影響範圍(單位:像素)
                Iy = Iy + WindY * 10 * (delms) * Math.sin(FloatImg3.Vt[N] + (1 / FloatImg3.V[N]) * Vt);

                context.save();

                var C = size / 2;
                context.translate(Ix, Iy); //FallenImg2 平移
                context.rotate(theta); //FloatImg3 正旋轉
                if (ScaleKey6 == 1) {
                    var ScaleX = 1 - Math.abs((Vx * 2 + Vy) / 8), ScaleY = 1 - Math.abs((Vx + Vy) / 8);
                    context.scale(ScaleX / 0.8, ScaleY / 0.8); // 水平垂直變形
                }
                switch (FallenImg2.pic[N] * 1) { // 陷阱:如果pic資料型態為字串，那case取數字就會出問題
                    case 1:
                        context.drawImage(Heart1, 0, 0, 1649, 1649, -C, -C, size, size); //畫出來囉~
                        break;
                    case 2:
                        context.drawImage(Heart2, 0, 0, 1649, 1649, -C, -C, size, size); //畫出來囉~
                        break;
                    case 3:
                        context.drawImage(Heart3, 0, 0, 1649, 1649, -C, -C, size, size); //畫出來囉~
                        break;
                }
                if (BubbleKey4 == 1) {
                    context.beginPath();
                    context.arc(0, 0, size, 0, 2 * Math.PI);
                    context.strokeStyle = "rgba(255,200,220,0.2)";
                    context.stroke();
                }
                context.restore();
            }

            //for終點
        }
        //if終點
    }
    //上層飄落物
    if (FallKey2 == 1) {

        for (N = 0; N < FallenImg2.ms.length; N++) {
            var delms = (ms - FallMs - FallenImg2.ms[N]) / 33;
            if (delms > 200) {

            }
            else if (delms > 0) {
                //資料轉存時，會從數字變成字串，因此在計算時，'+'會被當作字串相接，必須先用其他運算子把字串變成數字
                theta = FallenImg2.theta[N] * 1 + spin * delms; // 旋轉 spin = 0.025
                size = FallenImg2.size[N] * (1 - (Math.abs(delms - 75) + Math.abs(delms - 125)) / 210); // 變小 mini = 0.8
                Vt = FallenImg2.Vt[N] * 1 + Vel * delms; // 速度 Vel = 0.05

                Vx = FallenImg2.V[N] * Math.cos(Vt);
                Vy = FallenImg2.V[N] - FallenImg2.V[N] / 2.5 * Math.sin(Vt);

                Ix = FallenImg2.x[N] * 1 + FallenImg2.V[N] / Vel * 2 * Math.sin(Vt); // 對Vx積分
                Iy = FallenImg2.y[N] * 1 + FallenImg2.V[N] * delms + FallenImg2.V[N] / 2.5 * Math.cos(Vt); //Vy積分


                WindX = WindX / Math.pow(2, 1 / 100);// 最大值1，每 50偵(1500毫秒) 減半，最終趨於0
                WindY = WindY / Math.pow(2, 1 / 100);
                WindX = WindX + ((mouse.x - 1500 / 2) / 750 - WindX) / 50;
                WindY = WindY + ((mouse.y - 820 / 2) / 410 - WindY) / 50;


                if (Scene == 'A') { WindX = 0; WindY = 0 }
                else if (Scene == 'C') { WindX = 0.2; WindY = 0}
                else if (Scene == 'D') { WindX = 0; WindY = 0}

                Ix = Ix + WindX * 10 * (delms); //風的最大影響範圍(單位:像素)
                Iy = Iy + WindY * 10 * (delms);

                context.save();

                var C = size / 2;
                context.translate(Ix, Iy); //FallenImg2 平移
                context.rotate(theta); // FallenImg2 正旋轉
                if (ScaleKey6 == 1) {
                    var ScaleX = 1 - Math.abs((Vx * 2 + Vy) / 8), ScaleY = 1 - Math.abs((Vx + Vy) / 8);
                    context.scale(ScaleX / 0.8, ScaleY / 0.8); // 水平垂直變形
                }
                switch (FallenImg2.pic[N] * 1) { // 陷阱:如果pic資料型態為字串，那case取數字就會出問題
                    case 1:
                        context.drawImage(Heart1, 0, 0, 1649, 1649, -C, -C, size, size); //畫出來囉~
                        break;
                    case 2:
                        context.drawImage(Heart2, 0, 0, 1649, 1649, -C, -C, size, size); //畫出來囉~
                        break;
                    case 3:
                        context.drawImage(Heart3, 0, 0, 1649, 1649, -C, -C, size, size); //畫出來囉~
                        break;
                }
                if (BubbleKey4 == 1) {
                    context.beginPath();
                    context.arc(0, 0, size, 0, 2 * Math.PI);
                    context.strokeStyle = "rgba(255,200,220,0.2)";
                    context.stroke();
                }
                context.restore();
            }

            //for終點
        }
        //if終點
    }

    //最頂層 轉場用黑畫面
    if (SceneMs > ms) {
        var t = (100 + SceneTrans - SceneMs + ms) / (SceneTrans / 2);
        if (t < 1) {
            // 黑色半透明遮罩
            contextT.beginPath();
            contextT.rect(0, 0, 1520, 840);
            contextT.fillStyle = "rgba(0, 0, 0, " + t + ")";
            contextT.fill();
        }
        else if (t < 1.1) {
            FallKey2 = 0;
            TheaKey3 = 0;
            if (PreScene == 'A' || PreScene == 'D' || PreScene == 'C') {
                FallKey2 = 1;
                FallMs = ms;
            }
            else if (PreScene == 'B') {
                TheaKey3 = 1;
                FloatMs = ms;
            }

            Scene = PreScene;
            contextT.beginPath();
            contextT.rect(0, 0, 1520, 840);
            contextT.fillStyle = "rgba(0, 0, 0, " + 1 + ")";
            contextT.fill();
        }
        else if (t <= 2) {
            contextT.beginPath();
            contextT.rect(0, 0, 1520, 840);
            contextT.fillStyle = "rgba(0, 0, 0, " + (2 - t) + ")";
            contextT.fill();
        }
    }
    else if (SceneKey == true) {
        SceneKey = false;
        LNew++;
        LP.push(LNew);
        AnimeLyric.ms[LNew] = ms;
        AnimeLyric.Anime[LNew].play();
    }

    // 最後停止的時間
    if (ms > 600000 && false) {
        play = false;
        //clearTimeout(AutoTimer);
        document.getElementById("pause").value = "Unpause";
    }
    var delt = 33 - (ms % 100) % 33;
    if (delt < 15) {
        delt = delt + 33;
        ms = ms + delt; //若繼續循環，ms會被更新；若暫停，能完成修正延遲的動作
        log.push("延遲: " + delt + "ms (t = " + Math.floor(ms / 1000) + "s)");
    }
    AutoTimer = setTimeout(AutoUpdate, delt); //繼續循環，直到被別人叫停
}
// 在畫面中的console.log
var log = ["通知:"];

// 生成雪花
var spin = 0.025; // 旋轉 spin = 0.025
var mini = 0.8; // 變小 mini = 0.8
var Vel = 0.05; // 速度 Vel = 0.05

class Svg {
    constructor() {
        this.Anime = []
        this.ms = []
        this.end = []
        this.count = []
    }
    Build(num, Type, Dur, Start, Count, ATF) { //將陣列從spot處分開，並回傳後半段被切割掉的部分
        this.ms[num] = undefined;
        this.count[num] = Count;
        this.end[num] = undefined;
        if (ATF == undefined) {
            this.Anime[num] = new Vivus('L' + num, {
                type: Type, duration: Dur, start: Start,
                animTimingFunction: Vivus.EASE, // EASE, EASE_IN, EASE_OUT and EASE_OUT_BOUNCE
            });
        }
        else if (ATF == 'IN') {
            this.Anime[num] = new Vivus('L' + num, {
                type: Type, duration: Dur, start: Start,
                animTimingFunction: Vivus.EASE_IN, // EASE, EASE_IN, EASE_OUT and EASE_OUT_BOUNCE
            });
        }
        else if (ATF == 'OUT') {
            this.Anime[num] = new Vivus('L' + num, {
                type: Type, duration: Dur, start: Start,
                animTimingFunction: Vivus.EASE_OUT, // EASE, EASE_IN, EASE_OUT and EASE_OUT_BOUNCE
            });
        }
        else if (ATF == 'NONE') {
            this.Anime[num] = new Vivus('L' + num, {
                type: Type, duration: Dur, start: Start,
            });
        }
    }
}
var AnimeLyric = new Svg;
for (n = 0; n <= 14; n++) { 
    AnimeLyric.Build(n, 'oneByOne', 200, 'manual', 5000);
}
for (n = 15; n <= 15; n++) {
    AnimeLyric.Build(n, 'oneByOne', 200, 'manual', 9000);
}
for (n = 16; n <= 31; n++) {
    AnimeLyric.Build(n, 'oneByOne', 200, 'manual', 5000);
}
for (n = 32; n <= 33; n++) { //遠離家鄉
    AnimeLyric.Build(n, 'oneByOne', 400, 'manual', 12000);
}
//時間參數
var StartMs = new Date();
var ms = new Date() - StartMs;
var play = false;
var ImgSplice = 0;

function Start() {
    let iframe = document.querySelector("#Caco");
    iframe.setAttribute('allow', "autoplay");
    iframe.setAttribute('src', "https://u.pcloud.link/publink/show?code=XZubwmXZgYPXvSE558uCCq2MxHiwO0hWLsoX");
    // var audio = document.getElementById("Caco");
    // if(audio.paused == true){
    //     audio.play();
    // }
    // if (play == true) {
    //     clearTimeout(AutoTimer);
    // }
    play = true;
    PlayNext(ms);
    //Audio.play();
    //document.getElementById("restart").style.display = "inline-block";
    //document.getElementById("pause").style.display = "inline-block";
    document.getElementById("start").style.display = "none";
    Initial();
    
    StartMs = new Date();

    SceneMs = 2000;
    SceneTrans = 4000;
    PreScene = 'A';
    AutoUpdate();
    var canvas = document.getElementById("map");
    var context = canvas.getContext("2d");
    var canvasUnseen = document.getElementById("mapUnseen");
    var contextT = canvasUnseen.getContext("2d");

    //取得 canvas 於頁面的位置
    var canvas_rect = canvas.getBoundingClientRect();
    //監聽canvas(滑鼠進入mapping)
    canvasUnseen.addEventListener('mousedown', function (e) {
        clickms = ms;
        PlayNext(clickms);
    }, false);

    canvasUnseen.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - canvas_rect.left;
        mouse.y = e.pageY - canvas_rect.top;
        if (mousekey == true) {
            ms = ms + (mouse.x - pageX) * 50;
            pageX = mouse.x;
        }
    }, false);

    canvas.addEventListener('mouseup', function (e) {
        mousekey = false;
    }, false);

    window.addEventListener('keypress', function (e) {
        log.push("按下" + "鍵：" + e.key);
        console.log(e.key);
        if (KeyLock == 0) {
            KeyLock = 1;
            if (e.key == '1') {
                SceneTo = 1;
                LNew = 8;
            }
            else if (e.key == '2') {
                SceneTo = 2;
                LNew = 15;
            }
            else if (e.key == '3') {
                SceneTo = 3;
                LNew = 21;
            }
            else if (e.key == 'z') {
                StarKey1 = StarKey1 * (-1) + 1;
            }
            else if (e.key == 'x') {
                FallKey2 = FallKey2 * (-1) + 1;
            }
            else if (e.key == 'c') {
                TheaKey3 = TheaKey3 * (-1) + 1;
            }
            else if (e.key == 'v') {
                BubbleKey4 = BubbleKey4 * (-1) + 1;
            }
            else if (e.key == 'b') {
                RulerKey5 = RulerKey5 * (-1) + 1;
            }
            else if (e.key == 'n') {
                ScaleKey6 = ScaleKey6 * (-1) + 1;
            }
            else if (e.key == 'q' || e.key == 'Q') {
                TestKey = TestKey * (-1) + 1;
            }
            else if (e.key == 'k') {
                PlayNext(ms);
            }
            else if (e.key == 'j') {
                BackTrack();
            }
        }

    }, false);
    window.addEventListener('keyup', function (e) {
        KeyLock = 0;

    }, false);

}
function Pause() {
    var Audio = document.getElementById('Caco');
    if (play == true) {
        play = false;
        //clearTimeout(AutoTimer);
        document.getElementById("pause").value = "Unpause";
        Audio.pause();
    }
    else {
        clearTimeout(AutoTimer); // 先暫停並作一些處理

        var L = img1.ms.length;
        for (N = 0; N < L; N++) {
            if(img1.ms[N] > ms){
                ImgSplice = N; //找到時間軸大於當前 ms 的圖案 img
                img1.Cut(img2, ImgSplice);
                break;
            }
        }

        Audio.play();
        play = true;
        StartMs = new Date() - ms;
        AutoUpdate(); // 處理完陣列，開始動畫
        document.getElementById("pause").value = "Pause";
    }
}