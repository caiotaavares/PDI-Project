// Input RGB

// document.getElementById('btn-transformar').onclick = rgbToHsl(r, g, b);

function rgbToHsl(){
    
    let r = parseInt(document.getElementById("r-input").value);
    let g = parseInt(document.getElementById("b-input").value);
    let b = parseInt(document.getElementById("g-input").value);

    console.log(r, g, b);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    document.getElementById('h-res').value = [h];
    document.getElementById('s-res').value = [s];
    document.getElementById('l-res').value = [l];

    return [h, s, l];
}

function hslToRgb(){

    var h = parseInt(document.getElementById("h-input").value);
    var s = parseInt(document.getElementById("s-input").value);
    var l = parseInt(document.getElementById("l-input").value);

    var r, g, b;

    if(s == 0){
        r = g = b = l;
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    // r = Math.round(r * 255);
    // g = Math.round(g * 255);
    // b = Math.round(b * 255);

    document.getElementById('r-res').value = [r];
    document.getElementById('g-res').value = [g];
    document.getElementById('b-res').value = [g];
}