const gridContainer = document.querySelector("#gridContainer");
const container = document.querySelector(".container");
const rows = document.querySelectorAll(".row");
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

// make a new grid that adjusts the size of the pixels based upon the size passed in from the slider
function makeGridNew(size = 64){
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

// set up the default black pen to color the cells of the grid when hovered
function defaultPen(){
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseover',() => {
            cell.style.backgroundColor='black';
        });
    });
}

// SLIDER

let slider = document.getElementById("myRange");
let output = document.getElementById("sizeOutput");
output.textContent = `${slider.value} x ${slider.value}`;

// CREATE NEW GRID USING THE SIZE FROM THE INPUT SLIDER
slider.onmouseup = function() {
    output.innerHTML=`${slider.value} x ${slider.value}`;
    removeGrid();
    makeGridNew(slider.value);

    // this allows the reset button to accept slider.value (why is the slider.value logging every number that the slider has landed on in sequence)
    resetGrid(slider.value);

    //adding event listeners to the new grid
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseover',() => {
            cell.style.backgroundColor='black';
        });
    });
}

// update slider display as you move it
slider.oninput = function() {
    output.innerHTML=`${slider.value} x ${slider.value}`;
}


// Remove existing grid on slider adjustment

function removeGrid(){
    let element = document.getElementById("gridContainer");
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

// BUTTONS:
const reset = document.getElementById("reset");

// reset
function resetGrid(sliderValue){
    removeGrid();
    makeGridNew(sliderValue);
    defaultPen();
}

// color picker
function pickColor(r, g, b) {

}

// rainbow random color
function getRandomColor(r, g, b) {

}

// gradient pen
function selectGradient(){

}

reset.addEventListener('click', () => {resetGrid(slider.value)});

makeGridInitial(64);
defaultPen();
resetGrid();


