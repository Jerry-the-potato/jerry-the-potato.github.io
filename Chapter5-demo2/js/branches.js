let random = (num) => {
    return Math.random() * num;
};
let treeNodes = new Array();
let leafNodes = new Array();
let fallingNodes = new Array();
let Tree = function(x, y, r, theta, times, min = 0.015 * canvas.height + 0.007 * canvas.width){
    treeNodes = [this];
    leafNodes = [];
    fallingNodes = [];
    this.endX = x;
    this.endY = y;
    this.r = r;
    this.theta = theta;
    Stick.prototype.grow = treeGrowth.pointX;
    Stick.prototype.min = min;
    this.son = [new Stick(this, 1, 0, times)]
}
let Stick = function(father, shrink_diff, angleOffset, times){

    this.father = father;
    this.r = this.father.r * (shrink_diff);
    this.angleOffset = angleOffset;
    this.theta = this.father.theta + angleOffset;
    if(this.r < this.min || times < 0){
        leafNodes.push(this);
        this.growth = 0;
        this.growing = true;
        this.falling = false;
        this.img = pngImg['1'][2 + Math.floor(random(2))];
        return this;
    }
    treeNodes.push(this);
    let shrink = 0.65 + random(0.1);
    let diff = random(0.3) - 0.15; // +-0.15
    if(HEIGHT > WIDTH) diff = random(0.15); // 手機端設定(長型螢幕)
    if(this.r > this.min * 2)
        if(this.theta > 90) // 若為長型螢幕，讓樹向上生長
            this.son = [new Stick(this, (shrink - diff), 30 * (diff + 1), times - 1),
                        new Stick(this, (shrink + diff), 30 * (diff - 1), times - 1)];
        else
            this.son = [new Stick(this, (shrink + diff), 30 * (diff + 1), times - 1),
                        new Stick(this, (shrink - diff), 30 * (diff - 1), times - 1)];
    else
        this.son = [new Stick(this, (shrink - diff), 30 * (diff + 1), times - 1),
                    new Stick(this, (shrink + diff), 30 * (diff - 1), times - 1),
                    new Stick(this, (0.7 + random(0.1)), 30 * ( 0.5 + diff), times - 1),
                    new Stick(this, (0.7 - random(0.1)), 30 * (-0.5 - diff), times - 1)];
        
}
Tree.prototype.Transform = function(){
    let a = myMouse.pointX;
    let b = myMouse.pointY;
    for(let N = 1; N < treeNodes.length; N++){
        let node = treeNodes[N];
        let index = node.father.son.indexOf(node);
        // let parameter = ((index == 0)?(+1):(-1));
        // node.theta = node.father.theta + 30 * parameter;

        // 已知father, r, theta 三個參數，透過father取得座標後進行計算
        let x = node.father.endX;
        let y = node.father.endY;
        let r = node.r * Math.pow(node.grow, 1 + 3 * N/treeNodes.length);
        let theta = node.theta;
        node.endX = x + r * Math.cos(theta / 180 * Math.PI);
        node.endY = y - r * Math.sin(theta / 180 * Math.PI);
    }
    Stick.prototype.grow = treeGrowth.pointX;
};
Tree.prototype.Draw = function(){
    for(let N = 1; N < treeNodes.length; N++){
        let node = treeNodes[N];
        let x = node.father.endX,
            y = node.father.endY,
            r = node.r * Math.pow(node.grow, 1 + 3 * N/treeNodes.length),
            theta1 = node.father.theta / 180 * Math.PI,
            theta2 = node.theta / 180 * Math.PI;
        const Think = 3;
        const bend = 0.5;
        context.beginPath();
        context.moveTo(x + Think * Math.sin(theta1),
                       y - Think * Math.cos(theta1));
        context.bezierCurveTo(x + bend * r * Math.cos(theta1) + Think * Math.sin(theta1),
                              y - bend * r * Math.sin(theta1) - Think * Math.cos(theta1),
                              x + bend * 1.2 * r * Math.cos(theta2) + Think * Math.sin(theta2),
                              y - bend * 1.5 * r * Math.sin(theta2) - Think * Math.cos(theta2),
                              x + r * Math.cos(theta2) + Think * Math.sin(theta2),
                              y - r * Math.sin(theta2) - Think * Math.cos(theta2));
        // context.lineTo(x + r * Math.cos(theta2) + (-Think) * Math.sin(theta2),
        //                y - r * Math.sin(theta2) - (-Think) * Math.cos(theta2));
        // context.bezierCurveTo(x + 0.5 * r * Math.cos(theta2),
        //                     y - 0.5 * r * Math.sin(theta2),
        //                     x + 0.5 * r * Math.cos(theta1),
        //                     y - 0.5 * r * Math.sin(theta1),
        //                     x + (-Think) * Math.sin(theta1),
        //                     y - (-Think) * Math.cos(theta1));
        // context.lineWidth = 10 + (r)/45;
        // context.strokeStyle = 'rgba(165, 165, 165, 1)';
        // context.stroke();
        context.lineWidth = 1 + Math.pow(r, 1.1)/30;
        context.strokeStyle = 'rgba(120, 50, 30, 1)';
        context.stroke();
        // context.strokeStyle = 'rgba(255, 220, 205, 1)';
        // context.strokeStyle = 'rgba(120, 50, 30, 1)';
        // context.fillStyle = 'rgba(220, 200, 180, 1)';
        // context.fill();
    }
    
    for(let N = 0; N < leafNodes.length; N++){
        let node = leafNodes[N];
        if(node.growing == true){
            node.growth = Math.min(1, node.growth * 1.005 + 0.002);
            if(node.growth == 1){
                node.growing = false;
                fallingNodes.push(node);
            }
        }
        if(node.falling == false){
            let x = node.father.father.endX,
                y = node.father.father.endY,
                theta = node.theta / 180 * Math.PI;
            if(node.img == undefined) node.img = pngImg[1][2 + Math.floor(random(2))];
            else{
                context.strokeStyle = 'rgba(120, 215, 140, 1)';
                context.save();
                context.translate(x, y);
                context.rotate(-Math.PI / 4 - theta);
                context.drawImage(node.img, 0, 0, node.r * node.growth * 1.5, node.r * node.growth * 1.5);
                context.restore();
            }
        }
    }
};