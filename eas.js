const gridContainer = document.querySelector("#gridContainer");
const container = document.querySelector(".container");
const rows = document.querySelectorAll(".row");
const cell = document.querySelector(".cell");
let rgb = ''
let defaultPenToggle = true;
let gradientPenToggle = false;
let rainbowPenToggle = false;


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
    resetGrid(slider.value);
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
const defaultColor = document.getElementById("default");
const reset = document.getElementById("reset");
const rainbow = document.getElementById("rainbow");
const gradient = document.getElementById("gradient");
const colorSelect = document.getElementById("colorSelect")

// reset
function resetGrid(sliderValue){
    removeGrid();
    makeGridNew(sliderValue);
    if (defaultPenToggle === false && gradientPenToggle === false && rainbowPenToggle === true) {
        rainbowPen();
    } else if (defaultPenToggle === false && gradientPenToggle === true && rainbowPenToggle === false){
        gradientPen();
    } else {
        defaultPen();
    }
}

reset.addEventListener('click', () => {resetGrid(slider.value)});

// Default to black

defaultColor.addEventListener('click', () => {
    rainbowPenToggle = false, defaultPenToggle = true, gradientPenToggle = false;
    resetGrid(slider.value)});


// Color Selector - To be implemented

    /*function pickColor(r, g, b) {
        console.log("Pick a Color");
    }
    colorSelect.addEventListener('click', () => {pickColor()});
    */

// RANDOM COLOR PEN
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

function rainbowPen() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseover',() => {
            let color = getRandomColor();
            cell.style.backgroundColor=color;
        });
    });
}

rainbow.addEventListener('click', () => {
    //resetGridWithout(slider.value);
    rainbowPenToggle = true, defaultPenToggle = false, gradientPenToggle = false;
    resetGrid(slider.value);
    rainbowPen();
    
});

// GRADIENT PEN

function gradientPen(rgbColor){
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor='black';
            if (parseFloat(e.target.style.opacity)) {
                e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
            } else {
                e.target.style.opacity = 0.1;
            }
        });
    });
}

gradient.addEventListener('click', () => {
    rainbowPenToggle = false, defaultPenToggle = false, gradientPenToggle = true;
    resetGrid(slider.value);
    gradientPen();

});


// call initial functions to set up page
makeGridInitial(64);
defaultPen();
resetGrid();


