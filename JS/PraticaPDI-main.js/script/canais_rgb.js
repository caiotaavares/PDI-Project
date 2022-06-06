//Pega o contexto da imagem original
const canvas1 = document.getElementById("frame0");
const ctx1 = canvas1.getContext('2d');

// Pega o contexto da imagem 1
const canvasResultR = document.getElementById("frame1");
const ctxResultR = canvasResultR.getContext('2d');

//Pega o contexto da imagem 2
const canvasResultG = document.getElementById("frame3");
const ctxResultG = canvasResultG.getContext('2d');

//Pega o contexto da imagem 3
const canvasResultB = document.getElementById("frame4");
const ctxResultB = canvasResultB.getContext('2d');

document.getElementById('image1').onchange = onUpdateImage;
//Executa rgb quando clicado
document.getElementById('channelsrgb-button').onclick = rgb;

const item = document.getElementById("item-rgb");
item.style.backgroundColor = '#171C26';

function onUpdateImage(event){
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);

	drawImage(url);
}

function drawImage(url) {
	let image = new Image();

	image.onload = () => {
		canvas1.width = image.width;
		canvas1.height = image.height;

		ctx1.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    const data = imageData.data;

	}
	
	image.src = url;	
}

function rgb(){

  	const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const data = imageData.data;
  
	const imageDataR = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
  	const imageDataG = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
  	const imageDataB = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const dataR = imageDataR.data;
  	const dataG = imageDataG.data;
  	const dataB = imageDataB.data;

	for (let i = 0; i < data.length; i += 4) {
		dataR[i]     = data[i];
		dataR[i + 1] = 0;
		dataR[i + 2] = 0;

    dataG[i]     = 0;
		dataG[i + 1] = data[i];
		dataG[i + 2] = 0;

    dataB[i]     = 0;
		dataB[i + 1] = 0;
		dataB[i + 2] = data[i];
	}

	canvasResultR.width = canvas1.width;
	canvasResultR.height = canvas1.height;
	ctxResultR.putImageData(imageDataR, 0, 0);

  canvasResultG.width = canvas1.width;
	canvasResultG.height = canvas1.height;
	ctxResultG.putImageData(imageDataG, 0, 0);

  canvasResultB.width = canvas1.width;
	canvasResultB.height = canvas1.height;
	ctxResultB.putImageData(imageDataB, 0, 0);
}