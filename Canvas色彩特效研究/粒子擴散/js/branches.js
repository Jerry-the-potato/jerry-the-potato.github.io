let random = (num) => {
    return Math.random() * num;
};
let treeNodes = [];
let Tree = function(x, y, r, theta, times){
    treeNodes = [this];
    this.startX = x;
    this.startY = y;
    this.endX = x + r * Math.cos(theta / 180 * Math.PI);
    this.endY = y - r * Math.sin(theta / 180 * Math.PI);
    this.r = r;
    this.theta = theta;
    this.grow = 0;
    let shrink = 0.65 + random(0.1);
    let diff = random(0.3) - 0.15; // +-0.15
    this.son = [new Stick(this, (shrink - diff), 30 * (a+b+1), times - 1),
                new Stick(this, (shrink + diff), 30 * (a-b-1), times - 1)];
}
let Stick = function(father, shrink_diff, angleOffset, times){

    this.father = father;
    this.r = this.father.r * (shrink_diff);
    this.theta = this.father.theta + angleOffset;
    this.grow = 0;
    treeNodes.push(this);
    if(times > 0){
        let shrink = 0.65 + random(0.1);
        let diff = random(0.3) - 0.15; // +-0.15
        this.son = [new Stick(this, (shrink - diff), 30 * (a+b+1), times - 1),
                    new Stick(this, (shrink + diff), 30 * (a-b-1), times - 1)];
    }
}
// Tree.prototype.Update = function(){
//     for(let N = 1; N < treeNodes.length; N++){
//         let node = treeNodes[N];
//         // 已知father, r, theta 三個參數，透過father取得座標後進行計算
//         let x = node.father.endX;
//         let y = node.father.endY;
//         let r = node.r;
//         let theta = node.theta;
//         node.startX = x;
//         node.startY = y;
//         node.endX = x + r * Math.cos(theta / 180 * Math.PI);
//         node.endY = y + r * Math.sin(theta / 180 * Math.PI);
//     }
// }
Tree.prototype.Transform = function(){
    let a = myMouse.pointX;
    let b = myMouse.pointY;
    for(let N = 1; N < treeNodes.length; N++){
        let node = treeNodes[N];
        let index = node.father.son.indexOf(node);
        let parameter = ((index == 0)?(a+b+1):(a-b-1));
        // if(index == 0) console.log(0);
        // else console.log(1);
        node.theta = node.father.theta + 30 * parameter;
        // 已知father, r, theta 三個參數，透過father取得座標後進行計算
        let x = node.father.endX;
        let y = node.father.endY;
        let r = node.r;
        let theta = node.theta;
        node.startX = x;
        node.startY = y;
        node.endX = x + r * Math.cos(theta / 180 * Math.PI);
        node.endY = y - r * Math.sin(theta / 180 * Math.PI);
    }
};
Tree.prototype.Draw = function(){
    for(let N = 0; N < treeNodes.length; N++){
        let node = treeNodes[N];
        let x = (node.startX - WIDTH/2) * node.grow + WIDTH/2,
            y = (node.startY - HEIGHT)* node.grow + HEIGHT,
            r = node.r * node.grow,
            theta = node.theta / 180 * Math.PI;
        let x2 = x + r * Math.cos(theta);
        let y2 = y - r * Math.sin(theta);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + r * Math.cos(theta),
                       y - r * Math.sin(theta));
        context.lineWidth = 0.5 + Math.pow(r, 1.1)/30;
        context.strokeStyle = 'rgba(20, 0, 0, 1)';
        context.stroke();
        if(leafImg.complete){
            if(node.son != undefined){
                if(node.son[0].son == undefined){
                    let width = r;
                    let height = r * leafImg2.height / leafImg2.width;
                    context.save();
                    context.translate(x, y);
                    context.rotate(-theta);
                    context.translate(width/2, 0);
                    context.rotate(Math.PI/4);
                    context.drawImage(leafImg2, -width/2, -height/2, width, height);
                    context.restore();
                }
            }
            else if(node.son == undefined){
                let width = r;
                let height = r * leafImg.height / leafImg.width;
                context.save();
                context.translate(x, y);
                context.rotate(-theta);
                context.translate(width/2, 0);
                context.rotate(Math.PI/2);
                context.drawImage(leafImg, -width/2, -height/2, width, height);
                context.restore();
            }
        }

        node.grow = Math.min(node.grow + 0.01 / (0.8 + 2 * node.grow), 1);
    }
};