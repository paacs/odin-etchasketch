const canvasSize = 1024;

let container = document.querySelector(".container");
let ui = document.querySelector(".ui");
let gridSize = parseInt(ui.querySelector("#gridSize").value);
let gridSizeLbl = ui.querySelector("#gridSizeLbl");
let grid = [];


function generateGrid() {
    let boxSize = (canvasSize - (gridSize * 2)) / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        let box = document.createElement("div");
        box.setAttribute("style", "height: " + boxSize + "px; width: " + boxSize + "px; border: 1px solid whitesmoke;");
        box.class = "boxes";
        box.id = i;
        container.style.width = canvasSize + "px";
        grid.push(box);
        container.appendChild(box);
    }
}


function resetGrid() {
    while (grid.length > 0) {
        let box = grid.pop();
        container.removeChild(box);
    }
    generateGrid();
}


function colorBox(box) {
    // inner function to generate RGB values
    function getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }
    // if box's bg color hasn't been set, pick random color, else increase alpha value
    if (box.style.backgroundColor == "") {
        // box.style.backgroundColor = "rgba(0, 0, 0, 0.1)";    // grayscale
        box.style.backgroundColor = "rgba(" + getRandomInt(255) + "," + getRandomInt(255) + "," + getRandomInt(255) + "," + 0.1 + ")";    // random colors
    } else {
        bgColor = box.style.backgroundColor;
        alpha = parseFloat(bgColor.slice(-4, -1)) + 0.1;
        bgColor = bgColor.slice(0, -4) + alpha + ")";
        box.style.backgroundColor = bgColor;
    }
}


// attach event listeners
container.addEventListener("mouseover", (e) => {
    if (e.target.class == "boxes") {
        colorBox(e.target);
    }
})

ui.addEventListener("click", (e) => {
    if (e.target.id == "resetBtn") {
        resetGrid();
    }
})

ui.addEventListener("input", (e) => {
    if (e.target.id == "gridSize") {
        gridSize = e.target.value;
        gridSizeLbl.textContent = e.target.value + "x" + e.target.value;
    }
})

generateGrid();