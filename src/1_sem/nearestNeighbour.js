let scaleFac = 2.3; 
let panX = 10;
let panY = 10; 
let ang = 1;
let w = context1.canvas.width;
let h = context1.canvas.height;
let wd = context2.canvas.width;
let hd = context2.canvas.height;

let src = context1.getImageData(0, 0, w, h);
let data = new Uint32Array(src.data.buffer);
let dest = context2.createImageData(wd, hd);
let zoomData = new Uint32Array(dest.data.buffer);
let xdx = Math.cos(ang) * scaleFac;
let xdy = Math.sin(ang) * scaleFac;
let ind = 0;
let xx,yy;
for(let y = 0; y < hd; y ++){
    for(let x = 0; x < wd; x ++){
        xx = (x * xdx - y * xdy + panX);
        yy = (x * xdy + y * xdx + panY);
        if(xx >= 0 && xx < w && yy >= 0 && yy < h){                
             zoomData[ind++] = data[(xx | 0) + (yy | 0) * w];
        }else{
             zoomData[ind++] = 0;
        }
    }
}

context2.putImageData(dest, 0, 0);