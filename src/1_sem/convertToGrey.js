const convertGrey = () => {
  let canvas2 = document.getElementById("canvas-pdi2");
  let context2 = canvas2.getContext("2d");
  let img2 = document.getElementById("canvas-pdi1");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let pixels = imgData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    let I = parseInt(0.299*pixels[i] + 0.587*pixels[i + 1] + 0.114*pixels[i + 2]);
    pixels[i] = I;
    pixels[i + 1] = I;
    pixels[i + 2] = I;
  }
  imgData.data = pixels;
  context2.putImageData(imgData, 0, 0);
};