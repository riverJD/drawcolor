// Color that will be placed on a pixel. Sometimes we want this to 
// differ from the 'selected color'.
let currentColor = 'black';

//  How many children (color gradients) to create what what gradient
let brushModeActive = false;
let eraseModeActive = false;
let rainbowModeActive;
let gridActive = false;

let history = new Array();
const canvas = document.querySelector('#canvas');

const CANVAS_SIZE_DEFAULT = 16;
const PALETTE_SIZE = 8;
const PALETTE_GRADIENT_PERCENTAGE = .23;
let BG_COLOR = 'rgb(255, 255, 255)';


// Change BG Color

function setBGColor(){

}


// #Canvas generation functions
function clearGrid(){
    
    getPixels().forEach(pixel => pixel.remove());
}
// Create a grid of size x size and place on canvas
function createGrid(size){

    //const canvas = document.querySelector('.canvas');
    let gridsize = size * size;

    for (let i = 0; i < gridsize; i++){
        let cell = document.createElement('div');    
        // add ID to each cell for future manipulation
        setAttributes(cell, {"class": "pixel", "id": `grid${i}`, "style": `background-color: ${BG_COLOR}`});
;
        canvas.appendChild(cell); 
    }
    if(brushModeActive) {
        toggleBrushMode();
        
    }
    if(gridActive) { toggleGrid()};
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
        changeGridSize(slider.value);
        draw();
    }); 
}
function updateCanvasColor(color){
    
    fill(color);
    
    BG_COLOR = color;
    colorToolset();

}
function toggleGrid(mode){
    
    const gridbtn = document.querySelector('#gridbtn');

    if (mode == 'off'){
        gridbtn.classList.remove('toggle');
        getPixels().forEach(pixel => {
        pixel.classList.remove('pixelgrid');
        gridActive = false;
        });
    }
    else {
    gridbtn.classList.add('toggle');
    getPixels().forEach(pixel => {
        pixel.classList.add('pixelgrid');
        gridActive = true;
        });        
    }
}

// #Draw related functions
function draw(type){

    getPixels().forEach(pixel => {
       
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

    const pixelState = new Object();
    pixelState.pixel = pixel;


    // Handle a case where user switches canvas colors
    if (pixel.style.backgroundColor == BG_COLOR){
        pixelState.color = 'BG_COLOR'
    }
    else {

    pixelState.color = pixel.style.backgroundColor;
    }

    history.push(pixelState);
        
    if (rainbowModeActive){
        
        pixel.style.backgroundColor = (`rgb(${getRandomColorValue()},${getRandomColorValue()},${getRandomColorValue()})`);
    }
    else {
    


    pixel.style.backgroundColor = currentColor;
    }
}

// # Toolbox functions

function disableBrushMode(){

    const canvas = document.querySelectorAll('.brush');
    canvas.forEach(pixel => {    
        pixel.classList.remove('brush');
    })

    const brush = document.querySelector('#brush-mode');
    brush.classList.remove('toggle');
    brushModeActive = false;
}

function toggleBrushMode(){
    
     getPixels().forEach(pixel => {
        pixel.classList.add('brush');
    })
    const brush = document.querySelector('#brush-mode');
    brush.classList.add('toggle');
    brushModeActive = true;
}

function disableEraseMode(){
    document.querySelector('#eraserbtn').classList.remove('toggle');
    currentColor = getColor('current-color');
    eraseModeActive = false;
}

function toggleEraseMode(){
    disableRainbow();
    document.querySelector('#eraserbtn').classList.add('toggle');
    currentColor = BG_COLOR;
    eraseModeActive = true;
}

function disableRainbow(){
    document.querySelector('#rainbow').classList.remove('toggle');
    currentColor = getColor('current-color');
    rainbowModeActive = false;

}

function toggleRainbow(){
    disableEraseMode();
    document.querySelector('#rainbow').classList.add('toggle');
    rainbowModeActive = true;
    setRainbowTool()
}
function resetBrush(){
    currentColor = getColor('current-color');
}
// Generate random colors for rainbow tool icon
function setRainbowTool(){
    
    rainbow = document.querySelectorAll('.rainbow');
    rainbow.forEach(cell  => {
    
        cell.style.backgroundColor = (`rgb(${getRandomColorValue()},${getRandomColorValue()},${getRandomColorValue()})`);
});
}
// Sets color of tool icons to match BG color (ex: erase tool reflects proper bg color)
function colorToolset(){
    const toolsCanvas = document.querySelectorAll('.canvasColor');
    toolsCanvas.forEach(cell => {
        cell.style.backgroundColor = BG_COLOR;
    });
    const toolsCurrent = document.querySelectorAll
}
// Clear entire canvas 
function eraseCanvasContent(){
    getPixels().forEach(pixel => {
        pixel.style.backgroundColor = BG_COLOR;
    })
}
// Fill canvas from 'Current Selection' or override
function fill(color){
    // Allow override
    if (color == undefined){
        fill(currentColor);
    }

   getPixels().forEach((pixel) => {
       if ((getColor(pixel.id)) == BG_COLOR){
           setColor(pixel.id, color);
       }
    }
       );
}
function undoAction(){
    
    historyLen = history.length;

    if (historyLen === 0){
        return;
    }

    let prevAction = history.pop();

    if (prevAction.color == 'BG_COLOR'){
        prevAction.pixel.style.backgroundColor = BG_COLOR;

    }
    else {
    prevAction.pixel.style.backgroundColor = prevAction.color;
    }
}



// #Color palette related functions
// Get color from cell
function getColor(cellID){

    const selectedColor = document.querySelector(`#${cellID}`).style.backgroundColor;
    return (selectedColor);
    }

function setColor(cellID, color){
    const selectedColor = document.querySelector(`#${cellID}`);
    selectedColor.style.backgroundColor = color;
}
// Set 'Current Selection' to specified color
function setCurrentSelection(color){
    
    setPreviousSelection();    
    
    currentColor = color;

    const currentSelection = document.querySelectorAll('.current-color');
    currentSelection.forEach(cell => {
        cell.style.backgroundColor = color;
    })
}

function setPreviousSelection(){

    const prevSelection = document.querySelector('#previous-color');

    prevSelection.style.backgroundColor = currentColor;
}


// Enable us to grab a color from palette and assign it to Current Selection
function selectColorFromPalette(){
    const selectedColor = document.querySelector('.current-color');
    const palette = document.querySelectorAll('.color-picker');
 
    palette.forEach(color => {
        color.addEventListener('click', (e) => {
            setCurrentSelection(e.target.style.backgroundColor);
            disableEraseMode();
        });
    }) 
    // Enable custom colors
    const customColor = document.querySelector('#custom-picker');
    customColor.addEventListener('input', () => {
        setCurrentSelection(customColor.value)
     });
}

// Set color of each cell to it's ID color
function colorizePalette(){
    
    const palette = document.querySelectorAll('.color-picker');
    palette.forEach(color => { 
        const colorID = color.getAttribute('data-color');
        color.style.backgroundColor = colorID;
    })
}
// ## Palette generation functions
//  This series of functions will take the master color 
//  and attach a color to it's sub-palette. 

// Attach child cell to parent color head in palette
function setPaletteCellColor(colorHeadID, color){
    
    const colorType = document.getElementById(colorHeadID);
    let cell = document.createElement('input');
   
    setAttributes(cell, {"class": "color-picker", "id": color, "type": "button", "data-color": color})
    colorType.appendChild(cell);
}
// This will generate RBG color values based on a parent cell and 
// make a call to generate a child cell.
function createColorGradient(){  

    let colors = document.querySelectorAll('.color-type');
    colors.forEach( e => {


        let rgb = (e.getAttribute('data-color'));
        let red = getRGBValues(rgb)[0];
        let green = getRGBValues(rgb)[1];
        let blue = getRGBValues(rgb)[2];

        // Set color of cell reflecting parent
        setPaletteCellColor(e.id, e.getAttribute('data-color'))
        
        // Set color of children
        for (let i = 1; i < PALETTE_SIZE; i++)
        {
            red = Math.round(red - (red * PALETTE_GRADIENT_PERCENTAGE ));
            green = Math.round(green - (green * PALETTE_GRADIENT_PERCENTAGE));
            blue = Math.round(blue - (blue * PALETTE_GRADIENT_PERCENTAGE));
            let newColor = `rgb(${red},${green},${blue})`;
            setPaletteCellColor(e.id, newColor);
        }
    })
    // Add black to greyscale palette
    setPaletteCellColor('greyscale','black');
    }

// Will generate a series of 'parent' cells for palette. 
// Incomplete ~~ Disabledbbb
function createColorTypes(){

    const colorsToCreate = arguments.length;
    const palette = document.querySelector('sub-palette');
}
    
// #Helper functions

// Parse RGB Values from rbg(#,#,#) string.
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

function getRandomColorValue() {
     min = Math.ceil(0);
     max = Math.floor(255);
    return Math.floor(Math.random() * (max - min) + min);
}

function getPixels(){
    return (document.querySelectorAll('.pixel'));

}

// Edit BG Color, will switch CSS sheets (disabled)
function setBGColor(){
    const body = document.querySelector('body');
    const menu = document.querySelectorA
    const buttons = document.querySelectorAll('.bg-color-button');
    buttons.forEach(button => {
        let color = button.getAttribute('data-color');
        button.style.backgroundColor = color;
    })
}


// Create listeners for various inputs
function startListeners(){
    const button = document.querySelector('#clear-canvas');
    button.addEventListener('click', (e) => {      
        
        eraseCanvasContent();
    });

    const canvasColors = document.querySelectorAll('.canvas-picker');
    canvasColors.forEach(color => {
        color.addEventListener('click', () => {
        updateCanvasColor(color.id)
 
        });
        });

    const fillBtn = document.querySelector('#fill');
    fillBtn.addEventListener('click', () => console.warn('fill temporary disabled'));
    
    const eraser = document.querySelector('#eraserbtn');

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

    const gridlines = document.querySelector('#gridbtn');
    gridlines.addEventListener('click', () => {
        (gridActive ? toggleGrid('off') : toggleGrid('on'));
    })

    let helpModal = document.querySelector('#help-modal');
    let helpButton = document.querySelector('#help-button');
    let closeButton = document.querySelector('.closeModal');

    helpButton.addEventListener('click', () => helpModal.style.display = "block");
    
    closeButton.addEventListener('click', () => helpModal.style.display = 'none');


    const keyboard = window.addEventListener('keydown', (e) => {


        switch(e.key){
            case 'b': 
                (brushModeActive ? disableBrushMode(): toggleBrushMode())       
                break;
            case 'r': 
                (rainbowModeActive ? disableRainbow(): toggleRainbow())
                break;
            case 'e':
              (eraseModeActive ? disableEraseMode() : toggleEraseMode());
                break;
            case 'z':
                undoAction();

            }

    });

    const undo = document.querySelector('#undo');
    undo.addEventListener('click', () => {
        undoAction();
    });

    


}

init();

// Wake up helpers and generate default grid and palette.
function init(){
    
    // Wakeup calls
    changeGridSize(CANVAS_SIZE_DEFAULT);  
    createColorGradient();
    colorizePalette();
    selectColorFromPalette();
    setRainbowTool()
    setCurrentSelection(currentColor);
    updateGridOnSlider();
    colorToolset();
    toggleGrid();
    draw();
    setBGColor();
    startListeners();
}

