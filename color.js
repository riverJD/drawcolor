

// default
BG_COLOR = 'white';

//  How many of *each color* to crate
PALETTE_SIZE = 6
PALETTE_GRADIENT_PERCENTAGE = .1;
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
changeGridSize(16);    

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
       
        //console.log(pixel);
        pixel.addEventListener('mouseover', (e) => {
            //console.log(e);
           // console.log(e.target);
            e.target.style.backgroundColor = 'red';
        });
    });
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
// This will take the master color (IE: Red, Orange, Blue, Etc) 
// and attach a specified color to it's sub-palette. 
// color can be any understood html value
function setPaletteCellColor(colorHeadID, color){
    const colorType = document.getElementById(colorHeadID);
    //console.log(color);
    let cell = document.createElement('input');
    
    setAttributes(cell, {"class": "color-picker", "id": color, "type": "button"})
    //console.log(cell);
    //console.log('Creating cell: ' + cell);
    colorType.appendChild(cell);
    //console.log(colorType);
    
}

// This will create four cells of decending color gradient
function createColorGradient(){
    let createdCount = 0;

    let colors = document.querySelectorAll('.color-type');

    colors.forEach( e => {
    //console.log('>' + e.id);
    //console.log(getRGBValues(e.id));
    let red = getRGBValues(e.id)[0];
    let green = getRGBValues(e.id)[1];
    let blue = getRGBValues(e.id)[2];
    console.log('red:' + red + 'green: ' + green + 'blue: '+ blue );
    

    for (let i = 0; i < PALETTE_SIZE; i++)
    {
        red = red - (red * PALETTE_GRADIENT_PERCENTAGE * i);
        green = green - (green * PALETTE_GRADIENT_PERCENTAGE * i);
        blue = blue - (blue * PALETTE_GRADIENT_PERCENTAGE * i);
        let newColor = `rgb(${red},${green},${blue})`;
        //console.log(newColor);
        setPaletteCellColor(e.id, newColor);
    }
   
    
    //
    //console.log('>>>' + newColor);
    
    
    })
    }

// parses rgb(x,x,x) string and returns array of values
function getRGBValues(color){
    let rgb = color;
    rgb =  rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
return rgb;
}


   //let showValue = document.getElementById('rgb(236, 0, 0)')
   //console.log(showValue.id)

   //setPaletteCellColor(`rgb(236, 100, 0)`, 'blue');
    
createColorGradient();


//createColorGradient('#orange');




// So I don't have to manually sff every attribute
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
    colorizePalette();
    
    onMouseOver();
    const button = document.querySelector('#clear-canvas');
    button.addEventListener('click', (e) => {      
        console.log(e);
        eraseCanvasContent();
    });
    
}



