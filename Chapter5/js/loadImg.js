let mouseImg = new Image();
mouseImg.src = "../images/pic/Heart (1).png";

let theatherImg = new Array();
let leafImg = new Array();
let flowerImg = new Array();
let pngImg = {
    // look up by index as an array
    '0': new Array(),
    '1': new Array(),
    '2': new Array(),

    // look up by key as an object
    'Floating': theatherImg,
    'Falling': leafImg,
    'Staring': flowerImg}
for(let N = 0; N < 4; N++){
    theatherImg[N] = new Image();
    leafImg[N] = new Image();
    flowerImg[N] = new Image();
    // 等待每一張圖片讀取好
    leafImg[N].onload = () => {
        // 每張圖片創建一個對應的畫布
        pngImg[1][N] = document.createElement('canvas');
        pngImg[1][N].width = leafImg[N].width;
        pngImg[1][N].height = leafImg[N].height;
        let ctx = pngImg[1][N].getContext("2d");
        // 畫一次就可以了，以後就拿pngImg[N]來當圖片（N為0~3之間）
        ctx.drawImage(leafImg[N], 0, 0, leafImg[N].width, leafImg[N].height);
    }
}
theatherImg[0].src = "../images/pic/theather.png";
theatherImg[1].src = "../images/pic/theatherG.png";
theatherImg[2].src = "../images/pic/theatherP.png";
theatherImg[3].src = "../images/pic/theatherR.png";
leafImg[0].src = "../images/tinyPng/Leave2O.png";
leafImg[1].src = "../images/tinyPng/Leave2Y.png";
leafImg[2].src = "../images/tinyPng/LeaveRY.png";
leafImg[3].src = "../images/tinyPng/LeaveRR.png";
flowerImg[0].src = "../images/pic/Flower1.png";
flowerImg[1].src = "../images/pic/Flower2.png";
flowerImg[2].src = "../images/pic/Flower3.png";
flowerImg[3].src = "../images/pic/Sparkle2.png";

