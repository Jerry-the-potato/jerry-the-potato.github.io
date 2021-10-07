let animeList = new Array();
function animeObject(times, animeName='Falling',
                     imgNumber=Math.floor(Math.random()*2),
                     sizeMin=0.02,sizeMax=0.03,
                     lifeTime=5, timestamp=Date.now()){
    this.animeName = animeName;
    this.size = Math.random() * (sizeMax - sizeMin) + sizeMin;
    this.timestamp = Date.now();
    this.lifeTime = lifeTime;
    this.period = 1 + Math.random() * 1;
    this.scaleX = 1;
    this.scaleY = 1;

    // 變化屬性
    // this.pointX = this.beginX;
    // this.pointY = this.beginY;
    this.sizeNow = 0;
    this.rotateTheta = Math.random() * 360 / 180 * Math.PI;
    this.rotateOmega = 60 / this.period / 180 * Math.PI;
    this.revolveTheta = Math.random() * 360 / 180 * Math.PI;
    this.revolveOmega = 60 / this.period / 180 * Math.PI;

    if(fallingNodes.length){
        
        let ranIndex = Math.floor(Math.random() * fallingNodes.length);
        this.node = fallingNodes[ranIndex];
        if(this.node.img == undefined) return;
        this.node.falling = true;
        fallingNodes.splice(ranIndex, 1);
        this.rotateTheta = -Math.PI / 4 - this.node.theta / 180 * Math.PI;
        // this.revolveTheta = 0;
        this.size = this.node.r * 1.5 / WIDTH;
        this.beginX = this.node.father.father.endX - this.period * WIDTH * 0.02 * Math.sin(this.revolveTheta);
        this.beginY = this.node.father.father.endY - this.period * HEIGHT * 0.01 * Math.sin(this.revolveTheta * this.period);
        this.img = this.node.img;
        // this.img = pngImg['1'][2 + Math.floor(random(2))];
        animeList.push(this);
        if(times > 5) new animeObject(Math.pow(times, 0.9), animeName);
    }

        // switch(animeName){
        //     case 'Falling':
        //         this.beginX = Math.random() * WIDTH;
        //         this.beginY = Math.random() * HEIGHT;
        //     break;
        //     case 'Floating':
        //         this.beginX = Math.random() * WIDTH;
        //         this.beginY = Math.random() * 0.1 * HEIGHT + 0.95 * HEIGHT;
        //     break;
        //     case 'Staring':
        //         this.beginX = Math.random() * 0.1 * WIDTH +  0.45 * WIDTH;
        //         this.beginY = Math.random() * 0.1 * HEIGHT + 0.45 * HEIGHT;
        //     break;
        // }

    // times 的算法可以自行設計，就是把輸入的參數轉換成迭代的參數
    // 我是設計為5-100之間會進行迭代，然後每次開0.9次方根號
    // （100共會做十次、40會做八次、20會做六次、12會做四次、7會做兩次）

    // switch(mode){
    //     case 'Regular':
    //         this.SetPeriod(1, 1, 1);
    //         this.img = pngImg[this.animeName][imgNumber];
    //     break;
    //     case 'Various':
    //         this.SetPeriod(1 + Math.random() * 1, 1, 1);
    //         this.img = pngImg[this.animeName][Math.floor(Math.random()*4)];
    //     break;
    //     case 'Chaos':
    //         this.SetPeriod(1 + Math.random() * 1, 0.5 + Math.random() * 1, 0.5 + Math.random() * 1);
    //         this.img = pngImg[Math.floor(Math.random() * 3)][Math.floor(Math.random()*4)];
    //     break;
    //     case 'Free':
    //         this.img = pngImg[this.animeName][imgNumber];
    //     break;
    // }
}
animeObject.prototype.SetPeriod = function(period=1, scaleX=1, scaleY=1){
    this.period = period;
    this.rotateOmega = 40 / this.period / 180 * Math.PI;
    this.revolveOmega = 90 / this.period / 180 * Math.PI;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
}
animeObject.prototype.NextFrame = function(){

    // 檢查是否與滑鼠碰撞
    let x = camera.pointX * WIDTH - 0 * (myMouse.pointX - 0.5 * WIDTH) * 0.1;
    let y = camera.pointY * HEIGHT - (myMouse.pointY - 0.5 * HEIGHT) * 0.1;
    let distance2p = Math.pow(this.pointX + x - myMouse.pointX, 2) + Math.pow(this.pointY + y - myMouse.pointY, 2);
    let mouseWidth = WIDTH * 0.05;
    let thisWidth = this.sizeNow;
    if(distance2p < Math.pow((mouseWidth * 0.4 + thisWidth * 0.5), 2)){
        // 加分，落葉救得越早分數越多
        gameScores+= this.sizeNow;

        // 用另一個物件取代該物件
        let newObject = new animeObject2(this.node, this.rotateTheta,
                                         this.img, this.sizeNow,
                                         this.pointX, this.pointY,
                                         this.beginX, this.beginY, 60);
        let index = animeList.indexOf(this);
        delete animeList[index];
        animeList[index] = newObject;
    }

    // 計算下一偵的位置
    let dT = (Date.now() - this.timestamp) / 1000;

    if(this.animeName == "Floating") this.Floating(dT);
    else if(this.animeName == "Falling") this.Falling(dT);
    else if(this.animeName == "Staring") this.Staring(dT);

    if(dT < this.lifeTime){
        // 畫出下一偵的位置
        context.save();
        context.translate(this.pointX, this.pointY);
        // context.font = this.sizeNow + 'px IBM Plex Sans Arabic';
        // context.strokeStyle = 'rgba(179, 198, 213, 1)';
        // // let second = Math.floor((this.lifeTime - dT)*10)/10;
        // context.textAlign = 'center';
        // context.strokeText(Math.floor(this.sizeNow) , 0, -this.sizeNow - 50);
        let width = this.sizeNow;
        let height = this.sizeNow * this.img.height / this.img.width;
        let rotateNow = this.rotateTheta + this.rotateOmega * dT;
        context.rotate(rotateNow);
        context.drawImage(this.img, 0, 0, width, height);
        context.restore();
    }
    else{
        // 樹葉節點刪掉
        let leafIndex = leafNodes.indexOf(this.node);
        delete leafNodes[leafIndex];
        leafNodes.splice(leafIndex, 1);

        // 把動畫物件刪掉
        let index = animeList.indexOf(this);
        delete animeList[index];
        animeList.splice(index, 1);
    }
}
animeObject.prototype.Falling = function(dT){
    let revolveNow = this.revolveTheta + this.revolveOmega * dT;
    let A = Math.sin(revolveNow);
    let C = Math.sin(revolveNow * this.period);
    this.pointX = this.beginX + this.scaleX * (this.period * WIDTH * 0.02 * A + WIDTH * 0 * dT);
    this.pointY = this.beginY + this.scaleY * (this.period * HEIGHT * 0.01 * C + HEIGHT * 0.04 * dT);
    this.sizeNow = WIDTH * this.size * (1 - 1 * dT / this.lifeTime);
}
animeObject.prototype.Floating = function(dT){
    let lT = this.lifeTime;
    let revolve1 = (dT / lT) * Math.PI;
    let A = Math.sin(revolve1);
    let B = Math.cos(revolve1);
    this.pointX = this.beginX + this.scaleX * (this.period * WIDTH * 0 * B - WIDTH * 0 * (dT / lT));
    this.pointY = this.beginY - this.scaleY * (this.period * HEIGHT * 0.11 * A + HEIGHT * 0.05 * (dT / lT));
    const popSize = 0.3;
    this.sizeNow = WIDTH * this.size * (popSize + (1 - popSize) * this.GetSize(dT, lT));
}
animeObject.prototype.Staring = function(dT){
    let lT = this.lifeTime;
    let revolveNow = this.revolveTheta + this.revolveOmega * dT / lT;
    let A = Math.sin(revolveNow);
    let B = Math.cos(revolveNow);
    let radius = 0.3 * (WIDTH + HEIGHT);
    this.pointX = this.beginX + radius * this.scaleX * (this.period * 0.5 * B - 0 * (dT / lT));
    this.pointY = this.beginY - radius * this.scaleY * (this.period * 0.5 * A - 0 * (dT / lT));
    const popSize = 0.3;
    this.sizeNow = WIDTH * this.size * (popSize + (1 - popSize) * this.GetSize(dT, lT));
}
animeObject.prototype.GetSize = function(dT, lT){
    let Distance = function(t, t1 = 0.35, t2 = 0.5 ,t3 = 0.65){
        if(!isNaN(t)) 
            return Math.abs(t - t1) + Math.abs(t - t2) + Math.abs(t - t3);
    }
    let maxD = Distance(0.5);
    let minD = Distance(0);
    let distance = Distance(dT/lT);
    let transSize = (distance - minD) / (maxD - minD);
    return Math.pow(transSize, 1.5);
}

// 路徑動畫物件
function animeObject2(node, theta, img, size, originX, originY, targetX, targetY, frames = 120){
    this.node = node;
    this.theta = theta;
    this.img = img;
    this.sizeNow = size;
    this.pointX = originX;
    this.pointY = originY;
    this.originX = originX;
    this.originY = originY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.period = frames;
    this.timer = frames;
}
animeObject2.prototype.NextFrame = function(){
    if(this.timer > 0){
        let dX = this.targetX - this.originX;
        let dY = this.targetY - this.originY;
        let t = this.timer;
        let p = this.period;
        let linear = 1/p;
        let easeout = Math.pow(t/p, 2) - Math.pow((t-1)/p, 2);
        let easein = Math.pow(1 - (t-1)/p, 2) - Math.pow(1 - t/p, 2);
        let a = 1;//input.linear;
        let b = 1;//input.easein;
        let c = -3;//input.easeout;
        this.pointX+= (a * linear + b * easein + c * easeout) / (a+b+c) * dX;
        this.pointY+= (a * linear + b * easein + c * easeout) / (a+b+c) * dY;
        this.timer--;

        // 渲染圖形
        context.save();
        context.translate(this.pointX, this.pointY);
        let map = (this.timer / this.period);
        let width = this.sizeNow * map;
        let height = this.sizeNow * map * this.img.height / this.img.width;
        context.rotate(this.theta)
        context.drawImage(this.img, 0, 0, width, height);
        context.restore();
    }
    else{
        // 把動畫物件刪掉
        this.node.growth = 0;
        this.node.growing = true;
        this.node.falling = false;
        let index = animeList.indexOf(this);
        delete animeList[index];
        animeList.splice(index, 1);
    }
}