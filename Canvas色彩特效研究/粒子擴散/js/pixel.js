let pixelCreater = function(width = 100, height = 100, x = WIDTH/2, y = HEIGHT/2, R = 255, G = 200, B = 200){
    // 建立一維陣列
    this.cube = 30;
    width = Math.ceil(width / this.cube) + 10;
    height = Math.ceil(height / this.cube) + 2;
    if(height < 20){
        width*= 2;
        height*= 2;
        this.cube/= 2;
    }
    console.log("width: " + width, "height: " + height);
    this.x = x - WIDTH / 2; // 置中
    this.y = y - HEIGHT / 2;
    this.pixel = new Array(width);
    this.timestamp = Date.now();
    this.period = 10000;
    console.log("start painting!");
    for(let w = 0; w < width; w++){
        // 建立二維陣列
        this.pixel[w] = new Array(height);
        for(let h = 0; h < height; h++){
            // // 每個像素點給予顏色的RGB值
            let noise = 100;
            this.pixel[w][h] = new Array(3);
            this.pixel[w][h][0] = R * w / width + Math.random() * noise;
            this.pixel[w][h][1] = G/2 * h / height + Math.random() * noise;
            this.pixel[w][h][2] = B - B/2 * (w / width * h / height) + Math.random() * noise / 5;
            // if(w == Math.floor(width / 2)) this.pixel[w][h][0] = 255;
            // if(h == Math.floor(height / 3)) this.pixel[w][h][0] = 0;
        }
    }
    console.log("painted");
}
pixelCreater.prototype.Spread = function(){
    let ratio = 2 * this.cube - 1; // 顏料擴散速度
    let width = this.pixel.length;
    let array = new Array(width);
    for(let w = 0; w < width; w++){
        let height = this.pixel[w].length;
        array[w] = new Array(height);
        for(let h = 0; h < height; h++){
            array[w][h] = new Array(3);
            // 單一方向的擴散(染色)
            // this.pixel[w-1][h-1][0] = (this.pixel[w][h-1][0] + this.pixel[w-1][h-1][0] * ratio) / (ratio + 1);
            // this.pixel[w-1][h-1][1] = (this.pixel[w][h-1][1] + this.pixel[w-1][h-1][1] * ratio) / (ratio + 1);
            // this.pixel[w-1][h-1][2] = (this.pixel[w][h-1][2] + this.pixel[w-1][h-1][2] * ratio) / (ratio + 1);
            // this.pixel[w-1][h-1][0] = (this.pixel[w-1][h][0] + this.pixel[w-1][h-1][0] * ratio) / (ratio + 1);
            // this.pixel[w-1][h-1][1] = (this.pixel[w-1][h][1] + this.pixel[w-1][h-1][1] * ratio) / (ratio + 1);
            // this.pixel[w-1][h-1][2] = (this.pixel[w-1][h][2] + this.pixel[w-1][h-1][2] * ratio) / (ratio + 1);
        
            // 九宮格擴散
            let pixel = this.pixel;
            // console.log(w, h, width, height);
            if(w == 0 || h == 0 || w == width - 1 || h == height - 1){
                for(let N = 0; N < 3; N++)
                array[w][h][N] = pixel[w][h][N];
            }
            else{
                for(let N = 0; N < 3; N++){
                    array[w][h][N] = pixel[w-1][h-1][N] + pixel[w][h-1][N] + pixel[w+1][h-1][N] +
                                    pixel[w-1][h][N]   + pixel[w][h][N]   + pixel[w+1][h][N]   +
                                    pixel[w-1][h+1][N] + pixel[w][h+1][N] + pixel[w+1][h+1][N];
                    array[w][h][N] = (array[w][h][N]/9 + pixel[w][h][N] * ratio) / (ratio + 1);
                }
            }
        }
    }
    array.forEach((column, x) => {
        column.forEach((rgb, y) => {
            for(let N = 0; N < 3; N++)
            this.pixel[x][y][N] = rgb[N]; // rgb[N] == array[x][y][N]
        })
    })
    // this.pixel.forEach((value, x, row) => {
    //     let width = row.length; // 可利用 x / width 根據"水平座標"來線性調整擴散速度
    //     if(x == width - 1) return;
    //     value.forEach((rgb, y, column) => {
    //         let height = column.length; // 同上 y / height 也可利用
    //         if(y == height - 1) return;
    //         let weight = 5000 / this.cube - 1;
    //         // (rgb == column[y] == row[x][y])
    //         row[x][y][0] = (row[x+1][y][0] + row[x][y][0] * weight) / (weight + 1);
    //         row[x][y][1] = (row[x+1][y][1] + row[x][y][1] * weight) / (weight + 1);
    //         row[x][y][2] = (row[x+1][y][2] + row[x][y][2] * weight) / (weight + 1);
    //         row[x][y][0] = (row[x][y+1][0] + row[x][y][0] * weight) / (weight + 1);
    //         row[x][y][1] = (row[x][y+1][1] + row[x][y][1] * weight) / (weight + 1);
    //         row[x][y][2] = (row[x][y+1][2] + row[x][y][2] * weight) / (weight + 1);
    //     })
    // })

    // console.log("spread");
}
pixelCreater.prototype.Draw = function(){
    context.save();
    context.translate(-this.cube, -this.cube);
    let width = this.pixel.length;
    for(let w = 0; w < width; w++){
        let height = this.pixel[w].length;
        let delta = (Date.now() - this.timestamp) / this.period;
        let range = 255 * (Math.cos(delta * Math.PI) + Math.cos(delta * Math.PI * 2));
        // let range = 1000 * delta;
        for(let h = 0; h < height; h++){
            let gradient = 0;
            if(switchs["gradient"]["On"]){
                // gradient = delta * 0 + Math.abs(1 - 2 * w/width + 1 - 2 * h/height) * range;
                // gradient = delta * 0 + Math.cos(Math.PI * w/width) * range;
                gradient = range;
            }
            
            let hexMaker = function(hex = 255, add = 0, min = 0){
                hex = (hex + add) * (255 - min) / 255;
                let range = 255 - min;
                if(hex / range % 2 >= 1) hex = range - hex % range;
                else if(hex / range % 2 >= 0) hex = hex % range;
                else if(hex / range % 2 >= -1) hex = -hex % range;
                else if(hex / range % 2 >= -2) hex = range + hex % range;
                return min + hex;
            };
            let R = hexMaker(this.pixel[w][h][0], gradient, 50);
            let G = hexMaker(this.pixel[w][h][1], gradient, 100);
            let B = hexMaker(this.pixel[w][h][2], 0, 0);
            context.fillStyle = 'rgba(' + R + ', ' + G + ', ' + B + ', ' + ' 1)';
            
            // 蜂巢
            if(switchs["honeyComb"]["On"]){
                context.beginPath();
                for(let N = 0; N < 6; N++){
                    let theta = ((N + 0) / 6) * 2 * Math.PI;
                    let r = this.cube / Math.sqrt(3) + 0.3; // 蜂巢交界處會有縫隙，用 0.3 填補
                    let x = this.x + w * this.cube / 2 * Math.sqrt(3) + r * Math.cos(theta);
                    let y = this.y + (h + 0.5 * (w % 2 == 0)) * this.cube + r * Math.sin(theta);
                    context.lineTo(x, y);
                }
                context.lineWidth = 0.5;
                context.stroke();
                context.fill();
            }

            // 禪繞圓
            else if(switchs["circle"]["On"]){
                context.beginPath();
                let r = this.cube / Math.sqrt(3) + 0.3; // 蜂巢交界處會有縫隙，用 0.3 填補
                let x = this.x + w * this.cube / 2 * Math.sqrt(3);
                let y = this.y + (h + 0.5 * (w % 2 == 0)) * this.cube;
                context.arc(x, y, r, 0, 2 * Math.PI);
                context.lineWidth = 0.3;
                context.stroke();
                context.fill();
            }

            // 方形
            else if(switchs["square"]["On"]){
                context.fillRect(this.x + w * this.cube, this.y + h * this.cube, this.cube, this.cube);
                // context.lineWidth = 0.1;
                // context.strokeRect(this.x + w * this.cube, this.y + h * this.cube, this.cube, this.cube);
            }


            if(false){
                // 切割正方形
                context.fillStyle = 'rgba(' + R + ', ' + G + ', ' + G + ', 1)';
                context.fillRect(this.x + (w+0.5) * this.cube, this.y + (h) * this.cube, this.cube/2, this.cube/2);
                context.fillStyle = 'rgba(' + R + ', ' + G + ', ' + G + ', 1)';
                context.fillRect(this.x + (w) * this.cube, this.y + (h+0.5) * this.cube, this.cube/2, this.cube/2);
                // 斜三角形
                context.beginPath();
                context.lineTo(this.x + w     * this.cube, this.y + h     * this.cube);
                context.lineTo(this.x + (w+1) * this.cube, this.y + h     * this.cube);
                context.lineTo(this.x + w     * this.cube, this.y + (h+1) * this.cube);
                context.lineTo(this.x + w     * this.cube, this.y + h     * this.cube);
                context.fillStyle = 'rgba(' + R + ', ' + G + ', ' + (R+G+B)/3 + ', 1)'; // 陰影的設計，調整不會改變的背景色: 藍色
                context.fill();
            }
        }
    }
    context.restore();
    
    // 遮罩
    context.globalCompositeOperation = 'destination-out'; // 挖空邊緣的圖案
    context.beginPath();
    context.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0,2 * Math.PI);
    context.lineTo(WIDTH + 1, -1);
    context.lineTo(-1, -1);
    context.lineTo(-1, HEIGHT + 1);
    context.lineTo(WIDTH + 1, HEIGHT + 1);
    context.fill();
    context.globalCompositeOperation = 'source-over'; // 調整回預設值
}
pixelCreater.prototype.RGBtoHSV = function(r,g,b){
    let max = Math.max(r,g,b);
    let min = Math.min(r,g,b);
    let h,s,v;
    if(max == min){h = max/255*360;}
    else if(max == r){h = 60 * ((g-b)/(max-min) % 6);}
    else if(max == g){h = 60 * ((b-r)/(max-min) + 2);}
    else if(max == b){h = 60 * ((r-g)/(max-min) + 4);}

    if(max == 0) s = 0;
    else s = (max - min) / max;
    v = max / 255;
    return {'H':h,'S':s,'V':v};
}
pixelCreater.prototype.HSVtoRGB = function(h,s,v){
    let C = v * s;
    let X = C * (1 - Math.abs((h / 60) % 2 - 1));
    let m = v - C;
    let R, G, B;
    if(h < 60){R = C; G = X; B = 0;}
    else if(h < 120){R = X; G = C; B = 0;}
    else if(h < 180){R = 0; G = C; B = X;}
    else if(h < 240){R = 0; G = X; B = C;}
    else if(h < 300){R = X; G = 0; B = C;}
    else if(h <= 360){R = C; G = 0; B = X;}

    R = Math.floor((R + m) * 255);
    G = Math.floor((G + m) * 255);
    B = Math.floor((B + m) * 255);
    return {'R':R,'G':G,'B':B};
}
let pixels;