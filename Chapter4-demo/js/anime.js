let animeList = new Array();
function animeObject(times, animeName='Falling',
                     imgNumber=Math.floor(Math.random()*4),
                     sizeMin=0.03,sizeMax=0.04,
                     lifeTime=5, timestamp=Date.now()){
    this.animeName = animeName;
    this.imgNumber = imgNumber;
    this.img = pngImg[this.imgNumber];
    if(animeName == "Falling" || animeName == "Staring"){
        this.beginX = Math.random() * WIDTH;
        this.beginY = Math.random() * HEIGHT;
    }
    this.size = Math.random() * (sizeMax - sizeMin) + sizeMin;
    this.timestamp = Date.now();
    this.lifeTime = lifeTime;
    this.period = 1 + Math.random() * 1;
    this.scaleX = 1;
    this.scaleY = 1;

    // 變化屬性
    this.pointX = this.beginX;
    this.pointY = this.beginY;
    this.sizeNow = 0;
    this.rotateTheta = Math.random() * 360 / 180 * Math.PI;
    this.rotateOmega = 60 / this.period / 180 * Math.PI;
    this.revolveTheta = Math.random() * 360 / 180 * Math.PI;
    this.revolveOmega = 60 / this.period / 180 * Math.PI;
    if(times > 5) animeList.push(new animeObject(Math.pow(times, 0.9), 'Falling'));

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
            this.SetPeriod(1, 0.5 + Math.random() * 1, 0.5 + Math.random() * 1);
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
            let width = this.sizeNow;
            let height = this.sizeNow * this.img.height / this.img.width;
            let rotateNow = this.rotateTheta + this.rotateOmega * dT;
            context.save();
            context.translate(this.pointX, this.pointY);
            // context.font = this.sizeNow + 'px IBM Plex Sans Arabic';
            // context.strokeStyle = 'rgba(179, 198, 213, 1)';
            // let second = Math.floor((this.lifeTime - dT)*10)/10;
            // context.textAlign = 'center';
            // context.strokeText(second , 0, -this.sizeNow - 50);
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
    let B = Math.cos(revolveNow);
    let C = Math.sin(revolveNow * this.period);
    let D = Math.cos(revolveNow * this.period);
    this.pointX = this.beginX + this.scaleX * (this.period * WIDTH * 0.04 * A + WIDTH * 0.02 * dT);
    this.pointY = this.beginY + this.scaleY * (this.period * HEIGHT * 0.015 * C + HEIGHT * 0.08 * dT);
    const popSize = 0.2;
    let lT = this.lifeTime;
    let distanceT = (Math.abs(dT - lT*0.35) + Math.abs(dT - lT*0.65)) / lT;
    this.sizeNow = WIDTH * this.size * (popSize + (1 - distanceT));
}
animeObject.prototype.Floating = function(dT){
    let revolveNow = this.revolveTheta + this.revolveOmega * dT;
    let A = Math.sin(revolveNow);
    let B = Math.cos(revolveNow);
    let C = Math.sin(revolveNow * this.period);
    let D = Math.cos(revolveNow * this.period);
    this.pointX = this.beginX + this.scaleX * (this.period * WIDTH * 0.04 * A + WIDTH * 0.02 * dT);
    this.pointY = this.beginY + this.scaleY * (this.period * HEIGHT * 0.02 * C + HEIGHT * 0.06 * dT);
    const popSize = 0.2;
    let lT = this.lifeTime;
    let distanceT = (Math.abs(dT - lT*0.35) + Math.abs(dT - lT*0.65)) / lT;
    this.sizeNow = WIDTH * this.size * (popSize + (1 - distanceT));
}