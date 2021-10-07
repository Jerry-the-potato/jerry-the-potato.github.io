
// event.js 處理所有事件監聽和使用者交互
let header = document.querySelector("#header");
let startScreen = document.querySelector("#startScreen");
let Start = document.querySelector("#Start");
let How = document.querySelector("#How");
let Learn = document.querySelector("#Learn");
let Play = document.querySelector("#Play");
let Pause = document.querySelector("#Pause");
let Upload = document.querySelector("#Upload");
let Select = document.querySelector("#Select");
let dialog = document.querySelector("#dialog");

const maxTimes = 8;
let myTree = new Tree(WIDTH/2, 0.8 * HEIGHT, HEIGHT/6, 90, maxTimes);
startScreen.addEventListener('click', MakeTree);
function MakeTree(){
    treeGrowth.Restore();
    myTree = new Tree(WIDTH/2, 0.8 * HEIGHT, HEIGHT/6, 90, maxTimes);
}

Start.addEventListener("click", function(event){
    // 設定
    event.stopPropagation();

    // 執行
    startScreen.style.display = "none";
    opacity.NewTarget(1, 0, 90);
    audioCtx.resume();
    if(audio.paused){
        audio.play();
    }
});
How.addEventListener("click", function(){
    dialog.textContent = "樹葉會隨著音樂，不斷的掉落，玩家需要移動滑鼠，接住落葉，讓樹避免枯萎的命運";
});
Learn.addEventListener("click", function(){
    dialog.textContent = "本遊戲出自「從零打造網頁遊戲，造輪子你也辦的到！」教學文－－2021年度鐵人賽－－by Jerry, the Potato";
});


let audioControl = function(){
    // 取得該元件ID的值
    let ID = this.attributes.id.nodeValue; // 'Play' or 'Pause'
    if(ID == "Play"){
        audioCtx.resume();
        if(!audio.paused) audio.pause();
        // 讓玩家發現，剛剛開場的那顆樹，已經默默地成長為參天大樹
        myTree = new Tree(WIDTH/2, 0.8 * HEIGHT, 2.5 * HEIGHT/6, 90, maxTimes, 40);

        // 設定淡出和運鏡
        header.style.pointerEvents = "none";
        opacity.NewTarget(0, 0, 90);
        camera.NewTarget(0.1, 0.3, 120);

        // 切換場景 1>2
        cancelAnimationFrame(loadingAnime);
        openingAnime = requestAnimationFrame(OpeningScreen);
    }
    else{
        audio.pause();
    }
}
Play.addEventListener("click", audioControl, false);
// Pause.addEventListener("click", audioControl, false);
let FileManager = function(){
    try{
        URL.createObjectURL(this.files[0]);
    }catch(e){
        console.warn("無法建立此檔案之路徑: " + this.files[0]);
        return;
    }

    // 可接受的附檔名
    let validExts = new Array(".wav", ".mp3", ".m4a");
    let fileExt = this.files[0].name.substring(this.files[0].name.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        document.querySelector("#dialog").innerText = "檔案類型錯誤，可接受的副檔名有: " + validExts.toString();
        console.warn("檔案類型錯誤，可接受的副檔名有: " + validExts.toString());
        return;
    }
    audio.src = URL.createObjectURL(this.files[0]);
    document.querySelector("#dialog").innerText = "已上傳成功: " + this.files[0].name;
}
// document.querySelector("#Upload-beautify").addEventListener("click", function(){Upload.click();}, false);
// Upload.addEventListener("change", FileManager, false);
Select.addEventListener("change", function(){
    audio.src = "../music/" + this.value;
    document.querySelector("#dialog").innerText = "已選擇曲目: " + this.value;
    audioCtx.resume();
    audio.play();
}, false);

//取得 canvas 於頁面的位置
//監聽canvas
let a = 0, b = 0;
//canvas.addEventListener('mousemove', GetMouse);
document.querySelector("#game-box").addEventListener('mousemove', GetMouse);
function GetMouse(e) {
    let Rect = canvas.getBoundingClientRect();
    if(true){
        let x = (e.pageX - Rect.left) * RATIO;
        let y = (e.pageY - Rect.top) * RATIO;
        a = (x - WIDTH / 2) / (WIDTH / 2);
        b = (y - HEIGHT / 2) / (HEIGHT / 2);
        a = 2 * Math.pow(a, 2) * ((a>0)?1:-1);
        b = 2 * Math.pow(b, 2) * ((b>0)?1:-1);
        const frames = 20;
        // freeMouse.NewTarget(a, b, frames);
        myMouse.NewTarget(x, y, frames);
        // myTree.Transform();
    }
}

let mode = 'Various';
// document.querySelector("#Regular").addEventListener('click', ToggleAnime);
// document.querySelector("#Various").addEventListener('click', ToggleAnime);
// document.querySelector("#Chaos").addEventListener('click', ToggleAnime);
// document.querySelector("#Free").addEventListener('click', ToggleAnime);
// function ToggleAnime(){
//     let dialog = document.querySelector("#dialog");
//     dialog.textContent = '動畫模式: ' + this.textContent;
//     mode = this.attributes.id.nodeValue;
//     animeList.forEach(obj => {
//         switch(mode){
//             case 'Regular':
//                 obj.SetPeriod(1, 1, 1);
//             break;
//             case 'Various':
//                 obj.SetPeriod(1 + Math.random() * 1, 1, 1);
//             break;
//             case 'Chaos':
//                 obj.SetPeriod(1 + Math.random() * 1, 0.8 + Math.random() * 0.45, 0.8 + Math.random() * 0.45);
//             break;
//             case 'Free':
//             break;
//         }
//     });
// }



// canvas.addEventListener('touchmove', function (e) {
//     let Rect = canvas.getBoundingClientRect();
//     mouseX = (e.touches[0].pageX - Rect.left) * RATIO;
//     mouseY = (e.touches[0].pageY - Rect.top) * RATIO;
// }, false);


// let SlideDevBox = (Text) => {
//     if(Text == "＜"){
//         document.getElementById("devBox").style.top = "50%";
//         document.getElementById("devBoxArrow").innerText = "＞";
//     }
//     else{
//         document.getElementById("devBox").style.top = "100%";
//         document.getElementById("devBoxArrow").innerText = "＜";
//     }
// }
// let SlideMenu = (Text) => {
//     if(Text == "＜"){
//         document.getElementById("hiddenMenu").style.left = "85%";
//         document.getElementById("hiddenMenuArrow").innerText = "＞";
//     }
//     else{
//         document.getElementById("hiddenMenu").style.left = "100%";
//         document.getElementById("hiddenMenuArrow").innerText = "＜";
//     }
// }
// //<li><input id="geometry" class="button" type="button" value="幾何" onClick="SwitchImg('geometry')"></li>
// //<li><input id="starmoon" class="button" type="button" value="星月" onClick="SwitchImg('starmoon')"></li>
// focusImg = 'starmoon';
// let SwitchImg = (string) => {
//     document.getElementById(focusImg).style.color = "rgba(179, 198, 213, 1)";
//     document.getElementById(focusImg).style.background = "rgba(255, 255, 255, 0)";
//     document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
//     document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
//     focusImg = string;
//     pngImg = window[string + "Img"];
// }
// SwitchImg(focusImg);
// // <li><input id="Floating" class="button" type="button" value="漩渦" onClick="SwitchAnime('Floating')"></li>
// // <li><input id="Falling" class="button" type="button" value="秋風" onClick="SwitchAnime('Falling')"></li>
// // <li><input id="Staring" class="button" type="button" value="星空" onClick="SwitchAnime('Staring')"></li>

// focusAnime = 'Floating';
// let SwitchAnime = (string) => {
//     document.getElementById(focusAnime).style.color = "rgba(179, 198, 213, 1)";
//     document.getElementById(focusAnime).style.background = "rgba(255, 255, 255, 0)";
//     document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
//     document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
//     focusAnime = string;
// }
// SwitchAnime(focusAnime);
// // <li><input id="15000ms" class="button" type="button" value="簡單" onClick="SwitchLifeCycle(15000)"></li>
// // <li><input id="10000ms" class="button" type="button" value="一般" onClick="SwitchLifeCycle(10000)"></li>
// // <li><input id="6000ms" class="button" type="button" value="困難" onClick="SwitchLifeCycle(6000)"></li>

// focusLifeCycle = 10000;
// let SwitchLifeCycle = (number) => {
//     document.getElementById(focusLifeCycle + "ms").style.color = "rgba(179, 198, 213, 1)";
//     document.getElementById(focusLifeCycle + "ms").style.background = "rgba(255, 255, 255, 0)";
//     document.getElementById(number + "ms").style.color = "rgba(44, 66, 99, 1)";
//     document.getElementById(number + "ms").style.background = "rgba(179, 198, 213, 1)";
//     focusLifeCycle = number;
// }
// SwitchLifeCycle(focusLifeCycle);
// // <li><input id="gravityOn" class="button" type="button" value="On" onClick="SwitchGravity('gravityOn')"></li>
// // <li><input id="gravityOff" class="button" type="button" value="Off" onClick="SwitchGravity('gravityOff')"></li>

// focusGravity = 'gravityOff';
// let SwitchGravity = (string) => {
//     document.getElementById(focusGravity).style.color = "rgba(179, 198, 213, 1)";
//     document.getElementById(focusGravity).style.background = "rgba(255, 255, 255, 0)";
//     document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
//     document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
//     focusGravity = string;
// }
// SwitchGravity(focusGravity);