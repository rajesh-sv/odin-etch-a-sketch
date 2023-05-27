const DEFAULT_CELL_COLOR = '#3d3846';
const DEFAULT_GRID_SIZE = 16;

let cellColor = DEFAULT_CELL_COLOR;
let gridSize = DEFAULT_GRID_SIZE;

const colorPicker = document.querySelector('#color-picker');
const eraserButton = document.querySelector('#eraser-button');
const clearButton = document.querySelector('#clear-button');
const gridSizeButton = document.querySelector('#grid-size-button');

gridSizeButton.textContent = `Grid Size: ${gridSize}`;

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