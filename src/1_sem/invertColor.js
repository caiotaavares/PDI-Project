const invertColors = () => {
  let canvas2 = document.getElementById("canvas-pdi2");

  let context2 = canvas2.getContext("2d");

  let img2 = document.getElementById("canvas-pdi1");

  context2.drawImage(img2, 0, 0);
  let imgData2 = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  for (let i = 0; i < imgData2.data.length; i += 4) {
    imgData2.data[i] = 255 - imgData2.data[i];
    imgData2.data[i + 1] = 255 - imgData2.data[i + 1];
    imgData2.data[i + 2] = 255 - imgData2.data[i + 2];
    imgData2.data[i + 3] = 255;
  }
  context2.putImageData(imgData2, 0, 0);
};