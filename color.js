// Color that will be placed on a pixel.
let currentColor = 'black';
// Default draw mode
let currentMode = 'click';
//  How many children (color gradients) to create what what gradient

let brushModeActive = false;
let eraseModeActive = false;
let rainbowModeActive;
const canvas = document.querySelector('.canvas');

PALETTE_SIZE = 8;
PALETTE_GRADIENT_PERCENTAGE = .23;
BG_COLOR = 'rgb(255, 255, 255)';


// #Grid generation functions

// Delete grid to make room for new one
function clearGrid(){
    const grid = document.querySelectorAll('.pixel');
    grid.forEach(e => e.remove());
}
// Create a grid of size x size and place on canvas
function createGrid(size){

    //const canvas = document.querySelector('.canvas');
    let gridsize = size * size;

    for (let i = 0; i < gridsize; i++){
        const grid = document.querySelector('.canvas');
        let cell = document.createElement('div');    
        // add ID to each cell for future manipulation
        setAttributes(cell, {"class": "pixel", "id": `grid${i}`, "style": `background-color: ${BG_COLOR}`});
;
        grid.appendChild(cell); 
    }
    if(brushModeActive) {
        toggleBrushMode();
    }
}
// Scale size of pixels on grid
function changeGridSize(size){
    clearGrid();
    //const canvas = document.querySelector('.canvas');
    
    document.querySelector('#curSize').textContent = `${size} x ${size}`;
    canvas.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
    createGrid(size);
}
// Change size of grid based on slider value
function updateGridOnSlider(){

    let slider = document.querySelector('.slider');
    slider.addEventListener('change', (e) => {
        //console.log(e);
        //console.log(slider.value);
        changeGridSize(slider.value);
        draw();
    }); 
}

// #Draw related functions
function draw(type){

    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
       
        pixel.addEventListener('click', (e) => colorPixel(e.target));
        pixel.addEventListener('mouseover', (e) => {
            if (pixel.classList.contains('brush')){
                colorPixel(e.target);
            }
        });
        
        //e.target.style.backgroundColor = currentColor;
        });
        
    }

function colorPixel(pixel){

    if (rainbowModeActive){
        
        pixel.style.backgroundColor = (`rgb(${getRandomColorValue()},${getRandomColorValue()},${getRandomColorValue()})`);
    }
    else {
    pixel.style.backgroundColor = currentColor;
    }

}

function disableBrushMode(){
    

    const canvas = document.querySelectorAll('.brush');
    canvas.forEach(pixel => {    
        pixel.classList.remove('brush');
        console.log(pixel);
    })

    const brush = document.querySelector('#brush-mode');
    brush.classList.remove('toggle');
    brushModeActive = false;
}

function toggleBrushMode(){

     const canvas = document.querySelectorAll('.pixel');
     canvas.forEach(pixel => {
        pixel.classList.add('brush');
    })
    
    const brush = document.querySelector('#brush-mode');
    brush.classList.add('toggle');
    brushModeActive = true;
}

function disableEraseMode(){

    document.querySelector('#eraser').classList.remove('toggle');
    currentColor = getColor('current-color');
    eraseModeActive = false;
}

function toggleEraseMode(){

    document.querySelector('#eraser').classList.add('toggle');
    currentColor = BG_COLOR;
    eraseModeActive = true;
}

function disableRainbow(){
    document.querySelector('#rainbow').classList.remove('toggle');
    currentColor = getColor('current-color');
    rainbowModeActive = false;
}

function toggleRainbow(){
    
    document.querySelector('#rainbow').classList.add('toggle');
    rainbowModeActive = true;
}



// Clear entire canvas 
function eraseCanvasContent(){
    const canvas = document.querySelectorAll('.pixel');
    canvas.forEach(pixel => {
        pixel.style.backgroundColor = BG_COLOR;
    })
}
// Fill canvas from 'Current Selection' or override
function fill(color){
    console.log('filling');
    if (color == undefined){
        fill(currentColor);
    }

   pixels = document.querySelectorAll('.pixel');
   //console.log(canvas);
   pixels.forEach((pixel) => {
       if ((getColor(pixel.id)) == BG_COLOR){
           console.log(getColor(pixel.id) + " " +BG_COLOR);
           setColor(pixel.id, color);
       }
    }
       
       );
}



function resetBrush(){
    //console.log(currentColor);
    currentColor = getColor('current-color');
    //console.log(currentColor);
}

// #Color palette related functions
// Get color from cell
function getColor(cellID){

    const selectedColor = document.querySelector(`#${cellID}`).style.backgroundColor;
    return (selectedColor);
    }

function setColor(cellID, color){
    //console.log('setting');
    const selectedColor = document.querySelector(`#${cellID}`);
    //console.log(selectedColor + color);
    selectedColor.style.backgroundColor = color;
}
// Set 'Current Selection' to specified color
function setCurrentSelection(color){
    const currentSelection = document.querySelector('#current-color');
    currentColor = color;
    currentSelection.style.backgroundColor = color;
}
// Enable us to grab a color from palette and assign it to Current Selection
function selectColorFromPalette(){
    const selectedColor = document.querySelector('#current-color');
    const palette = document.querySelectorAll('.color-picker');
 
    palette.forEach(color => {
        color.addEventListener('click', (e) => {
            console.log(e.target.style.backgroundColor);
            setCurrentSelection(e.target.style.backgroundColor);
            disableEraseMode();
        });
    }) 
    // Enable custom colors
    const customColor = document.querySelector('#custom-picker');
    customColor.addEventListener('input', () => {
        console.log('?');
        setCurrentSelection(customColor.value)
        console.log(customColor.value);
    });
}
// Set color of each cell to it's ID color
function colorizePalette(){
    
    const palette = document.querySelectorAll('.color-picker');
    palette.forEach(color => { 
        const colorID = color.getAttribute('id');
        color.style.backgroundColor = colorID;
    })
}

// ## Palette generation functions
//  This series of functions will take the master color 
//  and attach a color to it's sub-palette. 

// Attach child cell to parent color head
function setPaletteCellColor(colorHeadID, color){
    
    const colorType = document.getElementById(colorHeadID);
    let cell = document.createElement('input');
   
    setAttributes(cell, {"class": "color-picker", "id": color, "type": "button"})
    colorType.appendChild(cell);
}
// This will generate RBG color values based on a parent cell and 
// make a call to generate a child cell.
function createColorGradient(){
    let createdCount = 0;
    let colors = document.querySelectorAll('.color-type');
    colors.forEach( e => {

    let red = getRGBValues(e.id)[0];
    let green = getRGBValues(e.id)[1];
    let blue = getRGBValues(e.id)[2];
      setPaletteCellColor(e.id, e.id)
    for (let i = 1; i < PALETTE_SIZE; i++)
    {
        red = Math.round(red - (red * PALETTE_GRADIENT_PERCENTAGE ));
        green = Math.round(green - (green * PALETTE_GRADIENT_PERCENTAGE));
        blue = Math.round(blue - (blue * PALETTE_GRADIENT_PERCENTAGE));
        let newColor = `rgb(${red},${green},${blue})`;
        setPaletteCellColor(e.id, newColor);
    }
    })
    }
// Will generate a series of 'parent' cells for palette. 
function createColorTypes(){

    const colorsToCreate = arguments.length;
    const palette = document.querySelector('sub-palette');
}
// parses rgb(x,x,x) string and returns array of values for manipulation

// #Helper functions
function getRGBValues(color){
    let rgb = color;
    rgb =  rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
return rgb;
}
// Set multiple attributes from one function call
function setAttributes(element, attributes)
{
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    });
}

function getRandomColorValue(min, max) {
     min = Math.ceil(0);
     max = Math.floor(255);
    return Math.floor(Math.random() * (max - min) + min);
}
init();

// Wake up helpers and generate default grid and palette.
function init(){
    
    changeGridSize(4);    
    createColorGradient();
    setPaletteCellColor('rgb(255, 255, 255)','black');
    colorizePalette();
    selectColorFromPalette();
    setCurrentSelection(currentColor);
    updateGridOnSlider();
    draw();
    //console.log(getColor('grid2'));
    // Create listener to clear palette (should seperate this out?)
    const button = document.querySelector('#clear-canvas');
    button.addEventListener('click', (e) => {      
        
        eraseCanvasContent();
    });
    const fillBtn = document.querySelector('#fill');
    //console.log(fillBtn);
    fillBtn.addEventListener('click', () => fill());
    
    const eraser = document.querySelector('#eraser');

    eraser.addEventListener('click', () => {
        (eraseModeActive ? disableEraseMode() : toggleEraseMode());
    });

    const pen = document.querySelector('#pen');
    pen.addEventListener('click', () => {
        resetBrush();
        disableBrushMode();
        disableEraseMode();
    });
    
    const brush = document.querySelector('#brush-mode');
    brush.addEventListener('click', () => {
        (brushModeActive ? disableBrushMode(): toggleBrushMode())       
    });
    
    const rainbow = document.querySelector('#rainbow');
    rainbow.addEventListener('click', () => {
        (rainbowModeActive ? disableRainbow(): toggleRainbow())
    });

}

