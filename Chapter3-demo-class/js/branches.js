let random = (num) => {
    return Math.random() * num;
};
class Tree {
    constructor(father, x, y, r, theta, times) {
        this.father = father;
        this.grow = 0;
        this.startX = x;
        this.startY = y;
        this.endX = x + r * Math.cos(theta / 180 * Math.PI);
        this.endY = y + r * Math.sin(theta / 180 * Math.PI);
        // this.shrink = 0.65 + random(0.1);
        // this.diff = random(0.3) - 0.15;
        this.r = r;
        this.theta = theta;
        if (times > 0) {
            let shrink = 0.65 + random(0.1);
            let diff = random(0.3) - 0.15; // +-0.15
            this.son = [new Tree(this, this.endX, this.endY,
                r * (shrink - diff),
                theta + 30 * (a + b + 1), times - 1),
            new Tree(this, this.endX, this.endY,
                r * (shrink + diff),
                theta + 30 * (a - b - 1), times - 1)];
        }
    }
    Transform = function (index) {
        if (this.father) {
            let a = myMouse.pointX;
            let b = myMouse.pointY;
            let parameter = ((index == 0) ? (a + b + 1) : (a - b - 1));
            this.theta = this.father.theta + 30 * parameter;
            this.startX = this.father.endX;
            this.startY = this.father.endY;
            this.endX = this.startX + this.r * Math.cos(this.theta / 180 * Math.PI);
            this.endY = this.startY + this.r * Math.sin(this.theta / 180 * Math.PI);
        }
        if (this.son)
            this.son.forEach((branch, index) => branch.Transform(index));
    };
    Draw = function () {
        let x = (this.startX - WIDTH / 2) * this.grow + WIDTH / 2, y = (this.startY - HEIGHT) * this.grow + HEIGHT, r = this.r * this.grow, theta = this.theta;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + r * Math.cos(theta / 180 * Math.PI),
            y + r * Math.sin(theta / 180 * Math.PI));
        context.lineWidth = 1 + r / 50;
        context.strokeStyle = 'rgba(179, 198, 213, 1)';
        context.stroke();
        // 如果有子樹枝，就繼續呼叫所有的子樹枝
        if (this.son)
            this.son.forEach(branch => branch.Draw()); // 遞迴
        this.grow = Math.min(this.grow + 0.01 / (0.8 + 2 * this.grow), 1);
    };
}