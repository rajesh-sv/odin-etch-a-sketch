const DEFAULT_CELL_COLOR = '#3d3846';
const DEFAULT_GRID_SIZE = 16;

let cellColor = DEFAULT_CELL_COLOR;
let gridSize = DEFAULT_GRID_SIZE;
let mouseDown = false;

const gridDiv = document.querySelector('.grid');
const colorPicker = document.querySelector('#color-picker');
const eraserButton = document.querySelector('#eraser-button');
const clearButton = document.querySelector('#clear-button');
const gridSizeButton = document.querySelector('#grid-size-button');

window.onload = () => {
  colorPicker.value = cellColor;
  gridSizeButton.textContent = `Grid Size: ${gridSize}`;
  createGrid();
}

function clearGrid() {
  const gridCells = Array.from(gridDiv.childNodes);
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = '#ffffff';
  });
}

function changeCellColor(e) {
  e.target.style.backgroundColor = cellColor;
  e.stopPropagation();
}

function deleteGrid() {
  gridDiv.textContent = '';
}

function createGrid() {
  const cellWidth = `${512/gridSize}px`;
  const cellHeight = cellWidth;
  const numCells = gridSize ** 2;
  for (i=0; i<numCells; ++i)
    gridDiv.appendChild(createCell(cellWidth, cellHeight))
}

function createCell(cellWidth, cellHeight) {
  const div = document.createElement('div');
  div.style.width = cellWidth;
  div.style.height = cellHeight;
  div.classList.add('grid-cell');
  div.addEventListener('mousedown', (e) => {
    mouseDown = true;
    changeCellColor(e);
  });
  div.addEventListener('mouseup', () => mouseDown = false);
  div.addEventListener('mouseover', (e) => {
    if(mouseDown)
      changeCellColor(e); 
  });
  return div;
}

colorPicker.addEventListener('input', (e) => {
  eraserButton.classList.remove('eraser-button-on');
  cellColor = e.target.value;
});

eraserButton.addEventListener('click', () => {
  if(eraserButton.classList.toggle('eraser-button-on'))
    cellColor = '#ffffff';
  else
    cellColor = colorPicker.value;
});

clearButton.addEventListener('click', () => {
  eraserButton.classList.remove('eraser-button-on');
  clearGrid();
  cellColor = colorPicker.value;
});

gridSizeButton.addEventListener('click', () => {
  eraserButton.classList.remove('eraser-button-on');
  const newGridSize = getValidGridSize();
  if (newGridSize === gridSize) {
    clearGrid();
  } else {
    gridSize = newGridSize;
    gridSizeButton.textContent = `Grid Size: ${gridSize}`;
    deleteGrid();
    createGrid();
  }
  cellColor = colorPicker.value;
});

function getValidGridSize() {
  let newGridSize;
  try {
    newGridSize = Number(prompt('Enter no. of cells in a row: '));
    if (!isFinite(newGridSize) || newGridSize < 16 || newGridSize > 128) throw 'Enter valid number from 16 to 128';
  } catch(err) {
    alert(err);
    newGridSize = gridSize;
  }
  return newGridSize;
}