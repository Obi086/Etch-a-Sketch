const backColor=document.getElementById('backColor');
const gridSizeText=document.getElementById('gridSizeText');
const gridSizer=document.getElementById('gridSize');
const gridContainer=document.querySelector('.gridContainer');

const rainbowBtn=document.getElementById('rainbow');
const eraserBtn=document.getElementById('eraser');
const clearBtn=document.getElementById('clear');
const gridBtn=document.getElementById('grid');

let cellColor=document.getElementById('penColor').value;
let cellBackgroundColor=document.getElementById('backColor').value;
let gridSize=document.getElementById('gridSize').value;

let RainbowPen=false,
Eraser=false,
Grid=false;

let mouseDown=false;
gridContainer.onmousedown =()=> mouseDown=true;
document.onmouseup =()=> mouseDown=false;

rainbowBtn.addEventListener('click', ()=>{
    if(!RainbowPen){
        RainbowPen=true;
        Eraser=false;
        rainbowBtn.classList.add('btnOn');
        eraserBtn.classList.remove('btnOn');
    } else{
        RainbowPen=false;
        rainbowBtn.classList.remove('btnOn');
    };
});

eraserBtn.addEventListener('click', ()=>{
    if(!Eraser){
        Eraser=true;
        RainbowPen=false;
        eraserBtn.classList.add('btnOn');
        rainbowBtn.classList.remove('btnOn');
    } else{
        Eraser=false;
        eraserBtn.classList.remove('btnOn');
    };
});

clearBtn.addEventListener('click', ()=>{
    deleteGrid();
    createGrid(gridSize);
});

gridBtn.addEventListener('click', ()=>{
    const cells = Array.from(document.getElementsByClassName('cell'));
    cells.forEach(cell=>{
        cell.classList.toggle('CellGrid');
    });
    if(Grid) Grid=false;
    else Grid=true;
    gridBtn.classList.toggle('btnOn');
});

backColor.oninput=e=>{
    changeBackColor(e.target.value);
    cellBackgroundColor=document.getElementById('backColor').value;
};

gridSizer.onmousemove=e=>{
    gridSize=e.target.value;
    gridSizeText.textContent=`${gridSize} x ${gridSize}`;
};

gridSizer.onchange=e=>{
    deleteGrid();
    createGrid(e.target.value);
};

function createGrid(size){
    gridContainer.style.gridTemplateColumns=`repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows=`repeat(${size}, 1fr)`;
    for(let i=0; i<size*size; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell', 'clean');
        if(Grid)cell.classList.add('CellGrid');
        cell.addEventListener('mouseover' , changeCellColor);
        cell.addEventListener('click' , changeCellColor);
        cell.style.background = `${cellBackgroundColor}`;
        cell.style.border = 1;
        gridContainer.appendChild(cell);
    };
};

function changeCellColor(e){
    if(e.type == 'mouseover' && !mouseDown)return;
    const cell = e.target;
    if(!Eraser){
        cellColor = RainbowPen?
        RandomColor():document.getElementById('penColor').value;
        cell.style.background=`${cellColor}`;
        cell.classList.remove('clean');
    }else{
        const cellClasses=Array.from(cell.classList);
        if(cellClasses.includes('clean'))return;
        cell.classList.add('clean');
        cell.style.background=`${cellBackgroundColor}`;
    };
};

function changeBackColor(color){
    const cleanCells=Array.from(document.getElementsByClassName('cell'));
    cleanCells.forEach(cleanCell=>{
        cleanCell.style.background=`${color}`;
    });
    cellBackgroundColor=document.getElementById('backColor').value;
}

function RandomColor(){
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

function deleteGrid(){
    const cells=Array.from(document.getElementsByClassName('cell'));
    cells.forEach(cell=>{
        cell.remove();
    });
}

window.onload =()=>{
    createGrid(16);
    gridSizeText.textContent = `${gridSize} x ${gridSize}`;
}