let kernel = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

let kernel2 = [
  [0, -1, 0],
  [-1, 4, -1],
  [0, -1, 0],
];

let laplaceData = [];
const sharpenning = (imgData) => {
  let clampedArray = [];
  let pixelAt = bindPixelAt(imgData.data, imgData.width);

  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {

      let lapla = Math.round((
        (kernel[0][0] * pixelAt(x - 1, y - 1)) +
        (kernel[0][1] * pixelAt(x, y - 1)) +
        (kernel[0][2] * pixelAt(x + 1, y - 1)) +
        (kernel[1][0] * pixelAt(x - 1, y)) +
        (kernel[1][1] * pixelAt(x, y)) +
        (kernel[1][2] * pixelAt(x + 1, y)) +
        (kernel[2][0] * pixelAt(x - 1, y + 1)) +
        (kernel[2][1] * pixelAt(x, y + 1)) +
        (kernel[2][2] * pixelAt(x + 1, y + 1))
      ));

      laplaceData.push(lapla, lapla, lapla, 255);
    }
  }

  let imgDataLaplace = context1.createImageData(canvas1.width, canvas1.height);
  imgDataLaplace.data.set(new Uint8ClampedArray(laplaceData));

  laplaceData = [];

  return imgDataLaplace;
}

const laplace2 = (imgData) => {
  let clampedArray = [];
  let pixelAt = bindPixelAt(imgData.data, imgData.width);

  for (let y = 0; y < imgData.height; y++) {
    for (let x = 0; x < imgData.width; x++) {
      let lapla = Math.round((
        (kernel2[0][0] * pixelAt(x - 1, y - 1)) +
        (kernel2[0][1] * pixelAt(x, y - 1)) +
        (kernel2[0][2] * pixelAt(x + 1, y - 1)) +
        (kernel2[1][0] * pixelAt(x - 1, y)) +
        (kernel2[1][1] * pixelAt(x, y)) +
        (kernel2[1][2] * pixelAt(x + 1, y)) +
        (kernel2[2][0] * pixelAt(x - 1, y + 1)) +
        (kernel2[2][1] * pixelAt(x, y + 1)) +
        (kernel2[2][2] * pixelAt(x + 1, y + 1))
      ));

      laplaceData.push(lapla, lapla, lapla, 255);
    }
  }

  let imgDataLaplace = context1.createImageData(canvas1.width, canvas1.height);
  imgDataLaplace.data.set(new Uint8ClampedArray(laplaceData));

  laplaceData = [];

  return imgDataLaplace;
}

$("#btn-laplace-sharp").on("click", () => {

  let canvas2 = document.getElementById("canvas-pdi2");
  // let canvas3 = document.getElementById("canvas-pdi3");
  // let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  // let context3 = canvas3.getContext("2d");
  // let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let result = sharpenning(imgData);

  imgData = result;

  context2.putImageData(imgData, 0, 0);
  // context3.putImageData(imgData, 0, 0);
  // context4.putImageData(imgData, 0, 0);
});


$("#btn-laplace2").on("click", () => {
  let canvas2 = document.getElementById("canvas-pdi2");
  // let canvas3 = document.getElementById("canvas-pdi3");
  // let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  // let context3 = canvas3.getContext("2d");
  // let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let result = laplace2(imgData);

  imgData = result;

  context2.putImageData(imgData, 0, 0);
  // context3.putImageData(imgData, 0, 0);
  // context4.putImageData(imgData, 0, 0);
});