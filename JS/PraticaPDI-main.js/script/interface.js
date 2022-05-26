const item = document.getElementById("item-home");
item.style.backgroundColor = '#171C26'

const canvas1 = document.getElementById("frame1");
const ctx1 = canvas1.getContext('2d');

document.getElementById('image1').onchange = onUpdateImage;

canvas1.onmousemove = mousePicker;

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

function mousePicker(event){
	const x = event.layerX;
  const y = event.layerY;

	const pixel = canvas1.getContext('2d').getImageData(x, y, 1, 1);
	const data = pixel.data;

	const pixelR = data[0]
	const pixelG = data[1]	
	const pixelB = data[2]
	const pixelOpacity = data[3] / 255

	setPickerRGB(pixelR, pixelG, pixelB, pixelOpacity, x, y)
}

function setPickerRGB(r, g, b, opacity, x, y){
	const currentColor = document.getElementById('rgb-color-picker');
	const spanR = document.getElementById("r").querySelector('span');
	const spanG = document.getElementById("g").querySelector('span');
	const spanB = document.getElementById("b").querySelector('span');
  const spanX = document.getElementById("x").querySelector('span');
  const spanY = document.getElementById("y").querySelector('span');

	spanR.innerText = r;
	spanG.innerText = g;
	spanB.innerText = b;
  spanX.innerText = x;
  spanY.innerText = y;

	const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
	currentColor.style.backgroundColor = rgba;
}
