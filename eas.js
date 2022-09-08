const gridContainer = document.querySelector("#gridContainer");
const container = document.querySelector(".container");
const rows = document.querySelectorAll(".row");
const cell = document.querySelector(".cell");
let rgb = ''


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
    resetGridWithout(slider.value);
    defaultPen();
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
// set button variables
const reset = document.getElementById("reset");
const rainbow = document.getElementById("rainbow");
const gradient = document.getElementById("gradient");
const colorSelect = document.getElementById("colorSelect")

// reset
function resetGrid(sliderValue){
    removeGrid();
    makeGridNew(sliderValue);
    defaultPen();
}

reset.addEventListener('click', () => {resetGrid(slider.value)});

// reset without default pen included
function resetGridWithout (sliderValue){
    removeGrid();
    makeGridNew(sliderValue);
}

// Color Selector - To be implemented

/*function pickColor(r, g, b) {
    console.log("Pick a Color");
}
colorSelect.addEventListener('click', () => {pickColor()});
*/

// rainbow random color

function getRandomColor() {
    r = getRandomIntInclusive(0, 255);
    g = getRandomIntInclusive(0, 255);
    b = getRandomIntInclusive(0, 255);
    let rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1) + min);
}

function randomPen() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseover',() => {
            let color = getRandomColor();
            cell.style.backgroundColor=color;
        });
    });
}

rainbow.addEventListener('click', () => {
    resetGridWithout(slider.value);
    randomPen();
});

// gradient pen
function selectGradient(){
    console.log("10% each pass");
}

gradient.addEventListener('click', () => {selectGradient()});

// call initial functions to set up page
makeGridInitial(64);
defaultPen();
resetGrid();


