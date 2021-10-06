let Trail = function(x = 0, y = 0, visibility = false){
    this.pointX = x;
    this.pointY = y;
    this.originX = x;
    this.originY = y;
    this.period = 1;
    this.timer = 0;
    this.timestamp = Date.now();

    this.NewTarget = function(targetX = 1, targetY = 1, frames = 60){
        this.targetX = targetX;
        this.targetY = targetY;
        this.originX = this.pointX;
        this.originY = this.pointY;
        this.timer = frames;
        this.period = frames;
        this.Restore = function(){
            this.pointX = x;
            this.pointY = y;
            this.originX = x;
            this.originY = y;
            this.timer = frames;
            this.period = frames;
        };
    };
    this.NextFrame = function(a=input.linear, b=input.easein, c=input.easeout){
        if(this.timer > 0){
            let dX = this.targetX - this.originX;
            let dY = this.targetY - this.originY;
            let t = this.timer;
            let p = this.period;
            let linear = 1/p;
            let easeout = Math.pow(t/p, 2) - Math.pow((t-1)/p, 2);
            let easein = Math.pow(1 - (t-1)/p, 2) - Math.pow(1 - t/p, 2);
            this.pointX+= (a * linear + b * easein + c * easeout) / (a+b+c) * dX;
            this.pointY+= (a * linear + b * easein + c * easeout) / (a+b+c) * dY;
            this.timer--;
        }
        if(visibility){
            let width = WIDTH * 0.05;
            let height = WIDTH * 0.05 * mouseImg.height / mouseImg.width;
            context.save();
            context.translate(this.pointX, this.pointY);
            context.drawImage(mouseImg, -width/2, -height/2, width, height);
            context.restore();
        }
    };
}
let freeMouse = new Trail(0, 0, false);
let myMouse = new Trail(0, 0, true);
let treeGrowth = new Trail(0, 0, false);
let loading = new Trail(0, 0, false);
treeGrowth.NewTarget(1, 0, 120);
loading.NewTarget(1, 0, 120);
let camera = new Trail(0, 0, false);
let opacity = new Trail(0, 0, false);