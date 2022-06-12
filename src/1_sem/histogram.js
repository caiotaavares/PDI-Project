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

// draw histogram
let drawHistogram = function() {

  // set histogram size
  histogramCanvasNode.width = 256 * 3;
  histogramCanvasNode.height = 120;

  // draw histogram
  for (let c = 0; c < 3; c += 1) {
    // select color
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

    // draw line
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
  // clear
  for (let c = 0; c < 3; c += 1) {
    for (let i = 0; i < 256; i += 1) {
      histogram[c][i] = 0;
    }
  }

  // calc.
  for (let i = 0, l = imgData.data.length; i < l; i += 4) {
    for (let c = 0; c < 3; c += 1) {
      histogram[c][imgData.data[i + c]] += 1;
    }
  }

  // get range
  for (let c = 0; c < 3; c += 1) {
    minHistogram[c] = histogram[c].reduce((m, v) => Math.min(m, v), 0);
    maxHistogram[c] = histogram[c].reduce((m, v) => Math.max(m, v), 0);
  }
};


// histogram equalization
let histogramEqualization = function() {
  console.log("** Equalizando o histograma **");
  let canvas2 = document.getElementById("canvas-pdi2");
  // let canvas3 = document.getElementById("canvas-pdi3");
  // let canvas4 = document.getElementById("canvas-pdi4");
  // pegando referencia do contexto de renderização dele.
  let context2 = canvas2.getContext("2d");
  // let context3 = canvas3.getContext("2d");
  // let context4 = canvas4.getContext("2d");
  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  // calculate CDF
  calcHistogram();
  for (let c = 0; c < 3; c += 1) {
    cdf[c][0] = histogram[c][0];
    for (let i = 1; i < 256; i += 1) {
      cdf[c][i] = cdf[c][i - 1] + histogram[c][i];
    }
  }

  // create new image
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
  // context3.putImageData(imgData, 0, 0);
  // context4.putImageData(imgData, 0, 0);
};