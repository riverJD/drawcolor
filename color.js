

// default
BG_COLOR = 'white';

//  How many of *each color* to buildd
PALETTE_SIZE = 6

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


function fillPalette(){
    
    const palette = document.querySelectorAll('.color-picker');
    palette.forEach(color => {
        
        const colorID = color.getAttribute('id');
        color.style.backgroundColor = colorID;
    })
}

function setPaletteSelectionColor(){
    const colorType = document.querySelector("#red");
    let color = document.createElement('input');
    
    setAttributes(color, {"class": "color-picker", "id": 'blue', "type": "button"})

    colorType.appendChild(color);
}


setPaletteSelectionColor();

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
    fillPalette();
    onMouseOver();
    const button = document.querySelector('#clear-canvas');
    button.addEventListener('click', (e) => {      
        console.log(e);
        eraseCanvasContent();
    });
    
}



