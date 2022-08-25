const sketch = document.querySelector(".sketch");
const sizeGlide = document.querySelector(".sizeGlide");
const modes = document.querySelectorAll(".mode");
const vanish = document.querySelector(".vanish");
let colorMode = "SOLID";
let vanishBool = false;

//toggle vanish status
vanish.addEventListener("click", () => {
	vanish.classList.toggle("selected");
	vanishBool = vanishBool ? false : true;
});

//create deafault sketch
window.addEventListener("load", createSketch(16));

// update size in screen
sizeGlide.addEventListener("input", (e) => {
	displaySize(e.target.value);
});

//resize the sketch after releasing mouse
sizeGlide.addEventListener("mouseup", (e) => {
	createSketch(e.target.value);
});

//hover to etch
sketch.addEventListener("mouseenter", () => {
	const color =
		colorMode === "SOLID"
			? document.querySelector(".colorPick").value
			: undefined;
	etchSketch(color);
});

function displaySize(squres) {
	const dim = document.querySelector(".dim");
	dim.textContent = `${squres} x ${squres}`;
}

// create sketch with specified size
function createSketch(squares) {
	sketch.innerHTML = "";
	const sketchLength = sketch.offsetWidth;
	const cellSize = sketchLength / squares;
	for (let i = 0; i < squares; i++) {
		const row = document.createElement("div");
		row.classList.add("row");
		row.style.height = `${cellSize}px`;
		for (let j = 0; j < squares; j++) {
			const cell = document.createElement("div");
			cell.style.width = `${cellSize}px`;
			cell.style.height = `${cellSize}px`;
			cell.classList.add("cell");
			row.appendChild(cell);
		}
		sketch.appendChild(row);
	}
}

// etch a cell
function etchCell(cell, color = getRandomColor()) {
	cell.style.backgroundColor = color;
	//clear background after ...s
	if (vanishBool) {
		setTimeout(() => {
			cell.style.backgroundColor = "black";
		}, 500);
	}
}

// utility: get a random color
function getRandomColor() {
	return (
		"#" +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")
	);
}

// etch sketch
function etchSketch(color) {
	const cells = sketch.querySelectorAll(".cell");
	cells.forEach((cell) => {
		cell.addEventListener("mouseenter", () => etchCell(cell, color));
	});
}

// select color mode
modes.forEach((mode) => {
	mode.addEventListener("click", (e) => {
		removeClass(modes, "selected");
		e.target.classList.add("selected");
		colorMode = mode.textContent;
	});
});

// utility: remove a class from all selected nodes
function removeClass(nodeList, className) {
	nodeList.forEach((node) => {
		node.classList.remove(className);
	});
}
