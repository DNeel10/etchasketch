const gridContainer = document.querySelector("#gridContainer");
const container = document.querySelector(".container");
const rows = document.querySelectorAll(".row");
let gridSize = 64;
const cell = document.querySelector(".cell");

// make grid by nesting for loops to get a number of rows, and within each row, creating the same number of cells
function makeGridInitial(size){
    for (let i=0; i<size; i++){
        let row = document.createElement("div");
        row.className = "row";
        for (let j=1; j<=size; j++){
            let cell = document.createElement('div');
            cell.className="cell";
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

makeGridInitial(64);

// mouseover listener to darken each cell as the mouse passes over it
const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
    cell.addEventListener('mouseover',() => {
        cell.style.backgroundColor='black';
        console.log('darken');
    });
});

function makeGridNew(size){
    for (let i=0; i<size; i++){
        let row = document.createElement("div");
        row.className = "row";
        for (let j=1; j<=size; j++){
            let cell = document.createElement('div');
            cell.className="cell";
            cell.style.height=`${640/size}px`;
            cell.style.width=`${640/size}px`;
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

// SLIDER

let slider = document.getElementById("myRange");
let output = document.getElementById("sizeOutput");
output.innerHTML = `${slider.value} x ${slider.value}`;

// CREATE NEW GRID USING THE SIZE FROM THE INPUT SLIDER
slider.onmouseup = function() {
    let gridSize = this.value;

    output.innerHTML=`${this.value} x ${this.value}`;
    removeGrid();
    makeGridNew(this.value);

    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseover',() => {
            cell.style.backgroundColor='black';
            console.log('darken');
        });
    });
    return gridSize;
}
// update slider amount as you move it
slider.oninput = function() {
    let gridSize = this.value;
    output.innerHTML=`${this.value} x ${this.value}`;
    console.log(`slider-moved:${this.value}`);
}

console.log(`gridSize: ${gridSize}`);

// Remove existing grid on slider adjustment

function removeGrid(){
    let element = document.getElementById("gridContainer");
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}