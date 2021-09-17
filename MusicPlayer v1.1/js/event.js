

// <button id="devBoxArrow" class="button" onclick="SlideDevBox(this.innerText)">＜</button>
let SlideDevBox = (Text) => {
    if(Text == "＜"){
        document.getElementById("devBox").style.top = "50%";
        document.getElementById("devBoxArrow").innerText = "＞";
    }
    else{
        document.getElementById("devBox").style.top = "100%";
        document.getElementById("devBoxArrow").innerText = "＜";
    }
}
// <button id="hiddenMenuArrow" class="button" onclick="SlideMenu(this.innerText)">＜</button>
let SlideMenu = (Text) => {
    if(Text == "＜"){
        document.getElementById("hiddenMenu").style.left = "85%";
        document.getElementById("hiddenMenuArrow").innerText = "＞";
    }
    else{
        document.getElementById("hiddenMenu").style.left = "100%";
        document.getElementById("hiddenMenuArrow").innerText = "＜";
    }
}
//<li><input id="geometry" class="button" type="button" value="幾何" onClick="SwitchImg('geometry')"></li>
//<li><input id="starmoon" class="button" type="button" value="星月" onClick="SwitchImg('starmoon')"></li>
focusImg = 'starmoon';
let SwitchImg = (string) => {
    document.getElementById(focusImg).style.color = "rgba(179, 198, 213, 1)";
    document.getElementById(focusImg).style.background = "rgba(255, 255, 255, 0)";
    document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
    document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
    focusImg = string;
    pngImg = window[string + "Img"];
}
SwitchImg(focusImg);
// <li><input id="Floating" class="button" type="button" value="漩渦" onClick="SwitchAnime('Floating')"></li>
// <li><input id="Falling" class="button" type="button" value="秋風" onClick="SwitchAnime('Falling')"></li>
// <li><input id="Staring" class="button" type="button" value="星空" onClick="SwitchAnime('Staring')"></li>

focusAnime = 'Floating';
let SwitchAnime = (string) => {
    document.getElementById(focusAnime).style.color = "rgba(179, 198, 213, 1)";
    document.getElementById(focusAnime).style.background = "rgba(255, 255, 255, 0)";
    document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
    document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
    focusAnime = string;
}
SwitchAnime(focusAnime);
// <li><input id="15000ms" class="button" type="button" value="簡單" onClick="SwitchLifeCycle(15000)"></li>
// <li><input id="10000ms" class="button" type="button" value="一般" onClick="SwitchLifeCycle(10000)"></li>
// <li><input id="6000ms" class="button" type="button" value="困難" onClick="SwitchLifeCycle(6000)"></li>

focusLifeCycle = 10000;
let SwitchLifeCycle = (number) => {
    document.getElementById(focusLifeCycle + "ms").style.color = "rgba(179, 198, 213, 1)";
    document.getElementById(focusLifeCycle + "ms").style.background = "rgba(255, 255, 255, 0)";
    document.getElementById(number + "ms").style.color = "rgba(44, 66, 99, 1)";
    document.getElementById(number + "ms").style.background = "rgba(179, 198, 213, 1)";
    focusLifeCycle = number;
}
SwitchLifeCycle(focusLifeCycle);
// <li><input id="gravityOn" class="button" type="button" value="On" onClick="SwitchGravity('gravityOn')"></li>
// <li><input id="gravityOff" class="button" type="button" value="Off" onClick="SwitchGravity('gravityOff')"></li>

focusGravity = 'gravityOff';
let SwitchGravity = (string) => {
    document.getElementById(focusGravity).style.color = "rgba(179, 198, 213, 1)";
    document.getElementById(focusGravity).style.background = "rgba(255, 255, 255, 0)";
    document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
    document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
    focusGravity = string;
}
SwitchGravity(focusGravity);