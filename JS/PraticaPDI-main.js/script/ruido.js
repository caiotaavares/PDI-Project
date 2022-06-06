const canvas1 = document.getElementById("frame1");
const ctx1 = canvas1.getContext('2d');

const canvasResult = document.getElementById("frame3");
const ctxResult = canvasResult.getContext('2d');
//Pega a imagem do input
document.getElementById('image1').onchange = onUpdateImage;

//Executa a função que gera ruido
document.getElementById('ruido-button').onclick = ruido;

const item = document.getElementById("item-grayscale");
item.style.backgroundColor = '#171C26';

/**
 * Desenha a imagem na tela de Entrada
 */
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
/**
 * Desenha a imagem na tela de Entrada (FIM)
 */

function ruido(){

	const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const data = imageData.data;
	
	for (let i = 0; i < data.length; i += 60) {
		// let pixels = getRandomIntInclusive(0, data.length);
		// console.log(data.length);
		iRand = getRandomIntInclusive(0, 1);
		for (let k = 0; k < data.length; k += 1) {
			console.log(data[k]);
		}
			// data[i]     = 0;
			// data[i + 1] = 0;
			// data[i + 2] = 0;

		// console.log(iRand);
		if (iRand == 0) {
			data[i]     = 0;
			data[i + 1] = 0;
			data[i + 2] = 0;
		} else if (iRand == 1) {
			data[i]     = 255;
			data[i + 1] = 255;
			data[i + 2] = 255;
		}
	}

	canvasResult.width = canvas1.width;
	canvasResult.height = canvas1.height;
	ctxResult.putImageData(imageData, 0, 0);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
