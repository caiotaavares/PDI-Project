const gamma = (imgData, gamma) => {
  let S;
  let pixelAt = bindPixelAt(imgData.data, imgData.width);
  let c = 1.0;
  let clampedArray = [];
  let gammaData = [];

  let pixels = imgData.data;
  for(let i = 0; i < pixels.length; i+=4) {
    pixels[i] = 255 * Math.pow((pixels[i]/255), gamma);
    pixels[i + 1] = 255 * Math.pow((pixels[i + 1]/255), gamma);
    pixels[i + 2] = 255 * Math.pow((pixels[i + 2]/255), gamma);
  }
  
  return pixels;
};

$("#btn-gamma").on("click", () => {
  console.log("** Compressão Gama **");
  $("#gamma-result").empty();

  let canvas2 = document.getElementById("canvas-pdi2");
  // let canvas3 = document.getElementById("canvas-pdi3");
  // let canvas4 = document.getElementById("canvas-pdi4");

  let context2 = canvas2.getContext("2d");
  // let context3 = canvas3.getContext("2d");
  // let context4 = canvas4.getContext("2d");

  let imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);

  let g = parseFloat($("#gamma-value").val());

  if(g === undefined || g === null || isNaN(g))
    $("#gamma-result").append("Digite um valor valido para o threshold!!!");
  else {
    let result = gamma(imgData, g);  
    imgData.data.set(result);
    $("#gamma-result").append("Operação feita com sucesso!!");
  
    context2.putImageData(imgData, 0, 0);
    // context3.putImageData(imgData, 0, 0);
    // context4.putImageData(imgData, 0, 0);
  }
});