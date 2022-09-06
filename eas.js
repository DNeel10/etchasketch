const gridContainer = document.querySelector(".gridContainer");
const container = document.querySelector(".container");

// make grid by nesting for loops to get a number of rows, and within each row, creating the same number of cells
function makeGrid(size){
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

makeGrid(32);

// add mouseover listener to darken each cell as the mouse passes over it
const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
    cell.addEventListener('mouseover',() => {
        cell.style.backgroundColor='black';
        console.log('darken');
    });
});

let slider = document.getElementById("myRange");
let output = document.getElementById("sizeOutput");
output.innerHTML = `${slider.value} x ${slider.value}`;

// TO FINISH: update size of grid based upon input of the slider 
slider.oninput = function() {
    output.innerHTML=`${this.value} x ${this.value}`;
    makeGrid(this.value);
}