const canvas1 = document.getElementById("frame1");
const ctx1 = canvas1.getContext('2d');
const canvasResult = document.getElementById("frame3");
const ctxResult = canvasResult.getContext('2d');

//Pega a imagem do input
document.getElementById('image1').onchange = onUpdateImage;
//Executa a função que negativa a imagem
document.getElementById('negative-button').onclick = negative;

//Poe o resultado da operação na tela
const item = document.getElementById("item-negative");
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

// Aplica o negativo
function negative(){

	const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		data[i]     = 255 - data[i];
		data[i + 1] = 255 - data[i + 1];
		data[i + 2] = 255 - data[i + 2];
	}

	canvasResult.width = canvas1.width;
	canvasResult.height = canvas1.height;
	ctxResult.putImageData(imageData, 0, 0);
}