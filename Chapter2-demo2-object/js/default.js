// default.js 進行初始化設定

const RATIO = 2;
let WIDTH, HEIGHT;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];
context.lineCap = lineCap[1];

let leaf = new leafMaker(200, 500, 0);
function leafMaker(x, y, lifeTime){
    // 基本屬性
    this.pointX = x;
    this.pointY = y;
    this.img = leafImg;
    this.width = 200;
    this.height = 200 * this.img.height / this.img.width;
    this.isWaitng = false;

    // 落葉跟隨滑鼠的屬性
    this.originX = x;
    this.originY = y;
    this.period = 90;
    this.timer = 0;

    // 落葉自然落下的屬性
    this.beginX = x;
    this.beginY = y;
    this.timestamp = Date.now();
    this.lifeTime = lifeTime;
    this.rotateTheta = 0 / 180 * Math.PI;
    this.rotateOmega = 40 / 180 * Math.PI;
    this.revolveTheta = 0 / 180 * Math.PI;
    this.revolveOmega = 90 / 180 * Math.PI;

    this.fall = function(context, dT){
        let rotateNow = this.rotateTheta + this.rotateOmega * dT;
        let revolveNow = this.revolveTheta + this.revolveOmega * dT;

        let A = Math.sin(revolveNow);
        let B = Math.cos(revolveNow);
        let C = Math.sin(revolveNow * 1.5);
        let D = Math.cos(revolveNow * 1.5);
        this.pointX = this.beginX + 500 * A;
        this.pointY = this.beginY + 200 * C
                                    + 100 * dT;
        if(this.img.complete){
            context.save();
            context.translate(this.pointX, this.pointY);
            context.font = '32px IBM Plex Sans Arabic';
            context.strokeStyle = 'rgba(179, 198, 213, 1)';
            let ts = Math.floor((this.lifeTime - dT)*10)/10;
            context.textAlign = 'center';
            context.strokeText(ts , 0, -150);
            context.rotate(rotateNow);
            context.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
            context.restore();
        }
    }
    this.Refollow = function(frames){
        this.originX = this.pointX;
        this.originY = this.pointY;
        this.timer = frames;
        this.period = frames;
    }
    this.follow = function(context, targetX, targetY){
        let dX = targetX - this.originX;
        let dY = targetY - this.originY;
        if(this.timer > 0){
            let t = this.timer;
            let p = this.period;
            let linear = 1/p;
            let easeout = Math.pow(t/p, 2) - Math.pow((t-1)/p, 2);
            let easein = Math.pow(1 - (t-1)/p, 2) - Math.pow(1 - t/p, 2);
            let a = input.linear;
            let b = input.easein;
            let c = input.easeout;
            this.pointX+= (a * linear + b * easein + c * easeout) * dX;
            this.pointY+= (a * linear + b * easein + c * easeout) * dY;
        }
        else{
            this.originX = this.pointX;
            this.originY = this.pointY;
        }
        context.drawImage(this.img, this.pointX-this.width/2, this.pointY-this.height/2, this.width, this.height);
        this.timer--;
    }
}