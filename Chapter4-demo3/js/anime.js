let animeList = new Array();
function animeObject(times, animeName='Falling',
                     imgNumber=Math.floor(Math.random()*4),
                     sizeMin=0.03,sizeMax=0.04,
                     lifeTime=5, timestamp=Date.now()){
    this.animeName = animeName;
    this.imgNumber = imgNumber;
    this.img = pngImg[this.imgNumber];
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


    switch(animeName){
        case 'Falling':
            this.beginX = Math.random() * WIDTH;
            this.beginY = Math.random() * HEIGHT;
        break;
        case 'Floating':
            this.beginX = Math.random() * WIDTH;
            this.beginY = Math.random() * 0.1 * HEIGHT + 0.95 * HEIGHT;
        break;
        case 'Staring':
            this.beginX = Math.random() * 0.1 * WIDTH +  0.45 * WIDTH;
            this.beginY = Math.random() * 0.1 * HEIGHT + 0.45 * HEIGHT;
        break;
    }


    if(times > 5) animeList.push(new animeObject(Math.pow(times, 0.9), animeName));

    // times 的算法可以自行設計，就是把輸入的參數轉換成迭代的參數
    // 我是設計為5-100之間會進行迭代，然後每次開0.9次方根號
    // （100共會做十次、40會做八次、20會做六次、12會做四次、7會做兩次）

    switch(mode){
        case 'Regular':
            this.SetPeriod(1, 1, 1);
        break;
        case 'Various':
            this.SetPeriod(1 + Math.random() * 1, 1, 1);
        break;
        case 'Chaos':
            this.SetPeriod(1 + Math.random() * 1, 0.5 + Math.random() * 1, 0.5 + Math.random() * 1);
        break;
        case 'Free':
        break;
    }
}
animeObject.prototype.SetPeriod = function(period=1, scaleX=1, scaleY=1){
    this.period = period;
    this.rotateOmega = 40 / this.period / 180 * Math.PI;
    this.revolveOmega = 90 / this.period / 180 * Math.PI;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
}
animeObject.prototype.NextFrame = function(){

    // 計算下一偵的位置
    let dT = (Date.now() - this.timestamp) / 1000;
    if(this.animeName == "Floating") this.Floating(dT);
    else if(this.animeName == "Falling") this.Falling(dT);
    else if(this.animeName == "Staring") this.Staring(dT);

    if(dT < this.lifeTime){
        // 畫出下一偵的位置
        if(this.img.complete){
            context.save();
            // if(this.animeName == 'Floating' && mode == 'Free'){
            //     context.translate(WIDTH/2, HEIGHT/2);
            //     context.rotate(myMouse.pointX / 2 * Math.PI / 2);
            //     context.translate(0, myMouse.pointY * HEIGHT * 0.4);
            //     context.translate(-WIDTH/2, -HEIGHT/2);
            // }
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
            context.drawImage(this.img, -width/2, -height/2, width, height);
            context.restore();
        }
    }
    else{
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
    this.pointX = this.beginX + this.scaleX * (this.period * WIDTH * 0.04 * A + WIDTH * 0.02 * dT);
    this.pointY = this.beginY + this.scaleY * (this.period * HEIGHT * 0.015 * C + HEIGHT * 0.08 * dT);
    const popSize = 0.2;
    this.sizeNow = WIDTH * this.size * (popSize + (1 - popSize) * this.GetSize(dT, lT));
}
animeObject.prototype.Floating = function(dT){
    let lT = this.lifeTime;
    let revolve1 = (dT / lT) * Math.PI;
    let A = Math.sin(revolve1);
    let B = Math.cos(revolve1);
    this.pointX = this.beginX + this.scaleX * (this.period * WIDTH * 0 * B - WIDTH * 0 * (dT / lT));
    this.pointY = this.beginY - this.scaleY * (this.period * HEIGHT * 0.11 * A + HEIGHT * 0.05 * (dT / lT));
    const popSize = 0.2;
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
    const popSize = 0.1;
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