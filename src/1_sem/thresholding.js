const thresholding = (imgData, threshold, light, dark) => {
  let dataSize = imgData.data.length;
  let pixels = imgData.data;
  for(let i = 0; i < dataSize; i+=4) {
    let v = parseInt(pixels[i]*0.2126 + pixels[i + 1]*0.7152 + pixels[i + 2]*0.0722);
    if(v >= threshold) {
      pixels[i] = light[0];
      pixels[i + 1] = light[1];
      pixels[i + 2] = light[2];
      pixels[i + 3] = 255;
    } else {
      pixels[i] = dark[0];
      pixels[i + 1] = dark[1];
      pixels[i + 2] = dark[2];
      pixels[i + 3] = 255;
    }
  }
  return pixels;
};

$("#btn-limiar").on("click", () => {
  $("#threshold-result").empty();

  let canvas2 = document.getElementById("canvas-pdi2");
  // let canvas3 = document.getElementById("canvas-pdi3");
  // let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  // let context3 = canvas3.getContext("2d");
  // let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  let t = 0;
  t = parseInt($("#threshold-value").val());
  if($("#threshold-value").val() === undefined || $("#threshold-value").val() === null || isNaN($("#threshold-value").val()))
    $("#threshold-result").append("Digite um valor valido para o threshold!!!");
  else {
    t = $("#threshold-value").val();
    let result = thresholding(imgData, t, [255, 255, 255], [0, 0, 0]);

    imgData.data.set(result);
  
    context2.putImageData(imgData, 0, 0);
    // context3.putImageData(imgData, 0, 0);
    // context4.putImageData(imgData, 0, 0);
  }
});