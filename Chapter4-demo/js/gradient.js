
class gradient{
    constructor(WIDTH,HEIGHT){
        //defalut
        this.stop = [
            {
                color: '#8fd3f4',
                offset: 0,
            },
            {
                color: '#84fab0',
                offset: 1,
            }
        ];
        this.theta = Math.PI * 0;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.length = window.innerHeight;
        this.timestamp = Date.now();
    }
    SetRange(WIDTH, HEIGHT){
        this.centerX = WIDTH/2;
        this.centerY = HEIGHT/2;
        this.length = HEIGHT;
    }
    StyleNow = (theta=this.theta) => {
        let right = this.length/2 * Math.cos(theta);
        let up = (-1) * this.length/2 * Math.sin(theta);
        let x1 = this.centerX + right;
        let x2 = this.centerX - right;
        let y1 = this.centerY + up;
        let y2 = this.centerY - up;
        this.style = context.createLinearGradient(x1, y1, x2, y2);
        this.stop.forEach((obj) => {
            this.style.addColorStop(obj.offset, obj.color);
        });
        return this.style;
    }
    Transform = (rotateSpeed=1, alpha=1) => {
        this.theta+= rotateSpeed * Math.PI / 5000;
        let right = this.length/2 * Math.cos(this.theta);
        let up = (-1) * this.length/2 * Math.sin(this.theta);
        let x1 = this.centerX + right;
        let x2 = this.centerX - right;
        let y1 = this.centerY + up;
        let y2 = this.centerY - up;
        this.style = context.createLinearGradient(x1, y1, x2, y2);
        this.stop.forEach((obj, index, array) => {
            //如果對象是 hex 格式，轉成RGB
            obj.R = parseInt("0x" + obj.color.slice(1, 3));
            obj.G = parseInt("0x" + obj.color.slice(3, 5));
            obj.B = parseInt("0x" + obj.color.slice(5, 7));

            let HSV = gradient.RGBtoHSV(obj.R, obj.G, obj.B);
            let deltaTS = Date.now() - this.timestamp;
            const period = 30000;
            HSV.H = HSV.H + (array.length/(array.length + 1) - index) / 2 * 360 * deltaTS / (period);
            //HSV.S = HSV.S / 2 - (HSV.S / 2) * Math.cos(4 * Math.PI * deltaTS / period);
            if(HSV.H > 360) HSV.H = HSV.H % 360;
            else if(HSV.H < 0) HSV.H = 360 + (HSV.H % 360);
            let RGB = gradient.HSVtoRGB(HSV.H, HSV.S, HSV.V);
            // let color = "#" + (RGB.R * 256 * 256 + RGB.G * 256 + RGB.B - 1).toString(16);
            let color = 'rgba('+ RGB.R + ',' + RGB.G + ',' + RGB.B + ',' + alpha + ')'
            this.style.addColorStop(obj.offset, color);
        });
        return this.style;
    }
    static RGBtoHSV(r,g,b){
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
    static HSVtoRGB(h,s,v){
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
}
let Background = new gradient(WIDTH, HEIGHT);