
// event.js 處理所有事件監聽和使用者交互

let Play = document.querySelector("#Play");
let Pause = document.querySelector("#Pause");
let Upload = document.querySelector("#Upload");
let Select = document.querySelector("#Select");


let audioControl = function(){
    // 取得該元件ID的值
    let ID = this.attributes.id.nodeValue; // 'Play' or 'Pause'
    if(ID == "Play"){
        audioCtx.resume();
        audio.play();
        requestAnimationFrame(AnimationLoop);
    }
    else{
        audio.pause();
    }
}
Play.addEventListener("click", audioControl, false);
Pause.addEventListener("click", audioControl, false);
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
document.querySelector("#Upload-beautify").addEventListener("click", function(){Upload.click();}, false);
Upload.addEventListener("change", FileManager, false);
Select.addEventListener("change", function(){
    audio.src = "../music/" + this.value;
    document.querySelector("#dialog").innerText = "已選擇曲目: " + this.value;
}, false);


//取得 canvas 於頁面的位置
//監聽canvas
let a = 0, b = 0, c = 0, d = 0;
let mouseX = 0, mouseY = 0;
let isRotating = false;
canvas.addEventListener('mousedown', ToRotate, false);
canvas.addEventListener('mousemove', Rotate, false);
canvas.addEventListener('mouseup', () => isRotating = false, false);
canvas.addEventListener('mouseout', () => isRotating = false, false);
function ToRotate(e){
    let Rect = canvas.getBoundingClientRect();
    mouseX = (e.pageX - Rect.left) * RATIO;
    mouseY = (e.pageY - Rect.top) * RATIO;
    a = (mouseX - (e.pageX - Rect.left) * RATIO) / (WIDTH/2);
    b = (mouseY - (e.pageY - Rect.top) * RATIO) / (HEIGHT/2);
    isRotating = true;
}
function Rotate(e) {
    if (!isRotating) return;
    let Rect = canvas.getBoundingClientRect();
    // a = a - ((e.pageX - Rect.left) * RATIO - mouseX) / WIDTH;
    // b = b - ((e.pageY - Rect.top) * RATIO - mouseY) / HEIGHT;
    // mouseX = (e.pageX - Rect.left) * RATIO;
    // mouseY = (e.pageY - Rect.top) * RATIO;
    a = ((e.pageX - Rect.left) * RATIO - mouseX) / (WIDTH/2);
    b = ((e.pageY - Rect.top) * RATIO - mouseY) / (HEIGHT/2);
}
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