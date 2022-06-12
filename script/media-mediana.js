const canvas1 = document.getElementById("frame1");
const ctx1 = canvas1.getContext('2d');

const canvasResult = document.getElementById("frame3");
const ctxResult = canvasResult.getContext('2d');
//Pega a imagem do input
document.getElementById('image1').onchange = onUpdateImage;
//Executa a função de escala de cinza
// document.getElementById('grayscale-button').onclick = grayscale;

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

function grayscale() {
	const elements = document.getElementsByName("function-grayscale");

	let type;
	for(element of elements){
		if(element.checked){
			type = element.value;
		}
	}

	if(type === null) {
		alert("Por favor, selecione uma função!");
	}
	
	const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const data = imageData.data;

	if(type === "media") {

	} else if(type === "mediana") {
		//Implementar filtro da mediana

		// for (let i = 0; i < data.length; i += 4) {
		// 	let color = (data[i] + data[i + 1] + data[i + 2]) / 3;
		// 	data[i]     = color;
		// 	data[i + 1] = color;
		// 	data[i + 2] = color;
		// }
	}

  	canvasResult.width = canvas1.width;
	canvasResult.height = canvas1.height;
	ctxResult.putImageData(imageData, 0, 0);
}

function bindPixelAt(data, width) {
	// retorna o pixel na posição requisitada.
	return function(x, y, i) {
	  i = i || 0;
	  return data[((width * y) + x) * 4 + i];
	}
};
