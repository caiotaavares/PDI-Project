let histogram = Array.from({
  length: 3
}, () => {
  return Array.from({
    length: 256
  }, () => 0);
});

let minHistogram = Array.from({
  length: 3
}, () => 0);
let maxHistogram = Array.from({
  length: 3
}, () => 0);

let cdf = Array.from({
  length: 3
}, () => {
  return Array.from({
    length: 256
  }, () => 0);
});

let drawHistogram = function() {
  histogramCanvasNode.width = 256 * 3;
  histogramCanvasNode.height = 120;

  for (let c = 0; c < 3; c += 1) {
    switch (c) {
      case 0:
        histogramContext.strokeStyle = "rgb(255, 0, 0)";
        break;
      case 1:
        histogramContext.strokeStyle = "rgb(0, 255, 0)";
        break;
      case 2:
        histogramContext.strokeStyle = "rgb(0, 0, 255)";
        break;
    }
    histogramContext.beginPath();
    let min = minHistogram[c];
    let max = maxHistogram[c];
    for (let x = 0; x < 256; x += 1) {
      let v = Math.round(100 * (histogram[c][x] - min) / max);
      histogramContext.moveTo(x * 3 + c, 120 - v);
      histogramContext.lineTo(x * 3 + c, 120);
    }
    histogramContext.stroke();
  }
};

let calcHistogram = function() {
  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  for (let c = 0; c < 3; c += 1) {
    for (let i = 0; i < 256; i += 1) {
      histogram[c][i] = 0;
    }
  }
  for (let i = 0, l = imgData.data.length; i < l; i += 4) {
    for (let c = 0; c < 3; c += 1) {
      histogram[c][imgData.data[i + c]] += 1;
    }
  }
  for (let c = 0; c < 3; c += 1) {
    minHistogram[c] = histogram[c].reduce((m, v) => Math.min(m, v), 0);
    maxHistogram[c] = histogram[c].reduce((m, v) => Math.max(m, v), 0);
  }
};


let histogramEqualization = function() {
  let canvas2 = document.getElementById("canvas-pdi2");
  let context2 = canvas2.getContext("2d");
  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  calcHistogram();
  for (let c = 0; c < 3; c += 1) {
    cdf[c][0] = histogram[c][0];
    for (let i = 1; i < 256; i += 1) {
      cdf[c][i] = cdf[c][i - 1] + histogram[c][i];
    }
  }

  let newData = context1.createImageData(imgData.width, imgData.height);
  let max = imgData.width * imgData.height;
  for (let c = 0; c < 3; c += 1) {
    let min = cdf[c][0];
    for (let i = 0, l = imgData.data.length; i < l; i += 4) {
      let v = cdf[c][imgData.data[i + c]];
      newData.data[i + c] = Math.round(255 * (v - min) / (max - min));
      newData.data[i + 3] = 255;
    }
  }
  imgData = newData;
  context2.putImageData(imgData, 0, 0);
};