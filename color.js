

// default
BG_COLOR = 'white';

//  How many of *each color* to crate
PALETTE_SIZE = 6;
PALETTE_GRADIENT_PERCENTAGE = .25;
// Create a grid of size x size and place on canvas
function createGrid(size){

    const canvas = document.querySelector('.canvas');

    let gridsize = size * size;

    for (let i = 0; i < gridsize; i++){

        const grid = document.querySelector('.canvas');
        let cell = document.createElement('div');    
        cell.setAttribute('class','pixel');
       
        // add ID to each cell for future manipulation
        cell.setAttribute(`id`,`grid${i}`);

        grid.appendChild(cell); 
    }


}
changeGridSize(4);    

// delete grid to make room for new one
function clearGrid(){
    const grid = document.querySelectorAll('.pixel');
    grid.forEach(e => e.remove());
}

// Scale size of pixels on grid
function changeGridSize(size){
    clearGrid();
    const canvas = document.querySelector('.canvas');
    
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
        onMouseOver();
    });

    
}

function onMouseOver(){
    const canvas = document.querySelectorAll('.pixel');
    canvas.forEach(pixel => {
       
        pixel.addEventListener('click', (e) => {

            e.target.style.backgroundColor = 'red';
        });
    });
}

function selectColorFromPalette(){
    const selectedColor = document.querySelector('#current-color');
    console.log(selectedColor);
    const palette = document.querySelectorAll('.color-picker');
 
    palette.forEach(color => {
        //console.log(color);
        color.addEventListener('click', (e) => {
            console.log(e.target.style.backgroundColor);
            selectedColor.style.backgroundColor = e.target.style.backgroundColor;
        });
    })
}


function eraseCanvasContent(){
    const canvas = document.querySelectorAll('.pixel');
    canvas.forEach(pixel => {
        pixel.style.backgroundColor = BG_COLOR;
    })
}

// Set color of each cell to it's ID color
function colorizePalette(){
    
    const palette = document.querySelectorAll('.color-picker');
    palette.forEach(color => { 
        const colorID = color.getAttribute('id');
        color.style.backgroundColor = colorID;
    })
}
// This series of functions will take the master color 
// and attach a specified color to it's sub-palette. 
// color can be any understood html value
function setPaletteCellColor(colorHeadID, color){
    
    const colorType = document.getElementById(colorHeadID);
    let cell = document.createElement('input');
   
    setAttributes(cell, {"class": "color-picker", "id": color, "type": "button"})
    colorType.appendChild(cell);
}

// This will create values to assign to a new cell and call set function
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

    //Not currently used
function createColorTypes(){

    const colorsToCreate = arguments.length;
    const palette = document.querySelector('sub-palette');
}

// parses rgb(x,x,x) string and returns array of values for manipulation
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

// reset background color of pixels to background color
updateGridOnSlider();

init();

function init(){
    createColorGradient();
    setPaletteCellColor('rgb(255, 255, 255)','black');
    colorizePalette();
    selectColorFromPalette();
    onMouseOver();
    
    const button = document.querySelector('#clear-canvas');
    button.addEventListener('click', (e) => {      
        
        eraseCanvasContent();
    });
    
}



