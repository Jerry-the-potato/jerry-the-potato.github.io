let mouseTrail = function(x = 0, y = 0){
    this.pointX = x;
    this.pointY = y;

    this.originX = x;
    this.originY = y;
    this.targetX = x;
    this.targetY = y;
    this.period = 90;
    this.timer = 0;

    this.timestamp = Date.now();

    this.NewTarget = function(targetX, targetY, frames){
        this.targetX = targetX;
        this.targetY = targetY;
        this.originX = this.pointX;
        this.originY = this.pointY;
        this.timer = frames;
        this.period = frames;
    };
    this.Restore = function(){
        this.originX = 0;
        this.originY = 0;
        this.timer = 0;
    };
    this.NextFrame = function(){
        if(isWinding){
            let dT = (Date.now() - this.timestamp) / 1000;
            this.pointX = this.originX + 0.5 * Math.cos(dT * 30 / 180 * Math.PI);
            this.pointY = this.originY + 0.5 * Math.sin(dT * 25 / 180 * Math.PI);
        }
        else if(this.timer > 0){
            let dX = this.targetX - this.originX;
            let dY = this.targetY - this.originY;
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
        this.timer--;
    };
}
let myMouse = new mouseTrail(0, 0);