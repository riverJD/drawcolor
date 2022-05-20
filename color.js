




function createGrid(size){

    const canvas = document.querySelector('.canvas');

    let gridcount = 0;
    let gridsize = size * size;


    for (let i = 0; i < gridsize; i++){
        console.log(i);
        const grid = document.querySelector('.canvas');
        let cell = document.createElement('div');
        cell.setAttribute(`id`,`grid${i}`);
        cell.setAttribute('class','pixel');
        
        if(i + 1 % size === 0){
            cell.setAttribute(`class`, 'row-head');
        }
        
        
        grid.appendChild(cell);
        
        
        gridcount++;
        console.log(gridcount);
    }


    

}

createGrid();