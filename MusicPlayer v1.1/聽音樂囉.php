<!DOCTYPE html>

<php Access-Control-Allow-Origin: *></php>

<html>
    <head>
		<meta charset="utf-8" >
        <title>GT music</title>

        <link rel="stylesheet" type="text/css" href="./main.css">
        <!-- Javascript -->
        <script src="./image.js"></script>
        <script src="./window.js"></script>
        <script src="./main.js"></script>
    </head>


    <body class="body">
        <div class="gameBox">
            <canvas id="mycanvas" width="2400" height="1440"></canvas>
            <div id="hiddenMenu">
                <ul class="">
                    <h3>選擇圖案</h3>
                    <li><input id="geometry" class="button" type="button" value="幾何" onClick="SwitchImg('geometry')"></li>
                    <li><input id="starmoon" class="button" type="button" value="星月" onClick="SwitchImg('starmoon')"></li>
                    <script>
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
                    </script>
                </ul>
                <ul class="">
                    <h3>動畫模式</h3>
                    <li><input id="Floating" class="button" type="button" value="漩渦" onClick="SwitchAnime('Floating')"></li>
                    <li><input id="Falling" class="button" type="button" value="秋風" onClick="SwitchAnime('Falling')"></li>
                    <li><input id="Staring" class="button" type="button" value="星空" onClick="SwitchAnime('Staring')"></li>
                    <script>
                        focusAnime = 'Floating';
                        let SwitchAnime = (string) => {
                            document.getElementById(focusAnime).style.color = "rgba(179, 198, 213, 1)";
                            document.getElementById(focusAnime).style.background = "rgba(255, 255, 255, 0)";
                            document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
                            document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
                            focusAnime = string;
                        }
                        SwitchAnime(focusAnime);
                    </script>
                </ul>
                <ul class="">
                    <h3>消失速度</h3>
                    <li><input id="15000ms" class="button" type="button" value="簡單" onClick="SwitchLifeCycle(15000)"></li>
                    <li><input id="10000ms" class="button" type="button" value="一般" onClick="SwitchLifeCycle(10000)"></li>
                    <li><input id="6000ms" class="button" type="button" value="困難" onClick="SwitchLifeCycle(6000)"></li>
                    <script>
                        focusLifeCycle = 10000;
                        let SwitchLifeCycle = (number) => {
                            document.getElementById(focusLifeCycle + "ms").style.color = "rgba(179, 198, 213, 1)";
                            document.getElementById(focusLifeCycle + "ms").style.background = "rgba(255, 255, 255, 0)";
                            document.getElementById(number + "ms").style.color = "rgba(44, 66, 99, 1)";
                            document.getElementById(number + "ms").style.background = "rgba(179, 198, 213, 1)";
                            focusLifeCycle = number;
                        }
                        SwitchLifeCycle(focusLifeCycle);
                    </script>
                </ul>
                <ul class="">
                    <h3>引力效果</h3>
                    <li><input id="gravityOn" class="button" type="button" value="On" onClick="SwitchGravity('gravityOn')"></li>
                    <li><input id="gravityOff" class="button" type="button" value="Off" onClick="SwitchGravity('gravityOff')"></li>
                    <script>
                        focusGravity = 'gravityOff';
                        let SwitchGravity = (string) => {
                            document.getElementById(focusGravity).style.color = "rgba(179, 198, 213, 1)";
                            document.getElementById(focusGravity).style.background = "rgba(255, 255, 255, 0)";
                            document.getElementById(string).style.color = "rgba(44, 66, 99, 1)";
                            document.getElementById(string).style.background = "rgba(179, 198, 213, 1)";
                            focusGravity = string;
                        }
                        SwitchGravity(focusGravity);
                    </script>
                </ul>
            </div>
            <div class="gameMenu">
                <span id=play></span>
                <input class="button" type="button" value="Play" onClick="PlayOn(true)">
                <span id=pause></span>
                <input class="button" type="button" value="Pause" onClick="PlayOn(false)">
                <select class="button" name="SongName" id="SongName" oninput="SwitchSong(this)">
                    <option>- 請選擇曲名 -</option>
                    <option value="Ill Miss You.mp3">Ill Miss You</option>
                    <option value="Main Kaun Hoon.mp3">Main Kaun Hoon</option>
                    <option value="Meri Pyaari Ammi.mp3">Meri Pyaari Ammi</option>
                    <option value="Nachdi Phira.mp3">Nachdi Phira</option>
                    <option value="Sapne Re.mp3">Sapne Re</option>
                    <option value="It's Over, Isn't It - Steven Universe.m4a">It's Over, Isn't It - S.U.</option>
                    <option value="Steven Universe Just a Comet.mp3">S.U. Just a Comet</option>
                    <option value="Steven Universe Strong In the Real Way Song.mp3">S.U. Strong In the Real Way</option>
                    <option value="summer.mp3">summer</option>
                    <option value="letting-go.mp3">letting-go</option>
                    <option value="leaves-in-the-wind.mp3">leaves-in-the-wind</option>
                    <option value="水晶音樂 卡農 Canon.m4a">水晶音樂 卡農 Canon</option>
                </select>
                <input class="button" type="button" value="Upload" onClick="document.getElementById('Upload').click()">
                <input class="button" type="file" value="Upload" style="display:none" id="Upload" oninput="SwitchSongLocal(this)">
                <audio id="Caco" controls>
                    <source src="./music/It's Over, Isn't It - Steven Universe.m4a">
                </audio>
                
            </div>
            
            
        </div>
    </body>

</html>