const canvas1 = document.getElementById("frame1");
const ctx1 = canvas1.getContext('2d');

const canvasResult = document.getElementById("frame3");
const ctxResult = canvasResult.getContext('2d');

document.getElementById('image1').onchange = onUpdateImage;

document.getElementById('grayscale-button').onclick = grayscale;

const item = document.getElementById("item-grayscale");
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

function grayscale() {
	const elements = document.getElementsByName("function-grayscale");

	let type;
	for(element of elements){
		if(element.checked){
			type = element.value;
		}
	}

	if(type === null) {
		alert("Selecione uma função");
	}
	
	const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
	const data = imageData.data;

	if(type === "luminance") {
		for (let i = 0; i < data.length; i += 4) {
			let I = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);

			data[i]     = I;
			data[i + 1] = I;
			data[i + 2] = I;
  	}
	}
	else if(type === "arithmetic") {
		for (let i = 0; i < data.length; i += 4) {
			let color = (data[i] + data[i + 1] + data[i + 2]) / 3;
			data[i]     = color;
			data[i + 1] = color;
			data[i + 2] = color;
		}
	}
  canvasResult.width = canvas1.width;
	canvasResult.height = canvas1.height;
	ctxResult.putImageData(imageData, 0, 0);
}
