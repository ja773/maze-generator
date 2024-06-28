document.addEventListener('DOMContentLoaded', () => {
    const mazeElement = document.getElementById('maze');
    const generateButton = document.getElementById('generateButton');
    const rows = 10;
    const cols = 10;
    
    class Cell {
      constructor(row, col) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
      }
  
      checkNeighbors(grid) {
        const neighbors = [];
  
        const top = grid[this.row - 1] ? grid[this.row - 1][this.col] : undefined;
        const right = grid[this.row][this.col + 1];
        const bottom = grid[this.row + 1] ? grid[this.row + 1][this.col] : undefined;
        const left = grid[this.row][this.col - 1];
  
        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);
  
        if (neighbors.length > 0) {
          const r = Math.floor(Math.random() * neighbors.length);
          return neighbors[r];
        } else {
          return undefined;
        }
      }
    }
  
    function createGrid(rows, cols) {
      const grid = [];
      for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
          grid[i][j] = new Cell(i, j);
        }
      }
      return grid;
    }
  
    function generateMaze(grid, startRow = 0, startCol = 0) {
      const stack = [];
      const startCell = grid[startRow][startCol];
      startCell.visited = true;
      stack.push(startCell);

      const entrance = startCell;
      const exit = grid[rows-1][cols-1];
      entrance.walls[0] = false;
      exit.walls[1] = false;
  
      while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const next = current.checkNeighbors(grid);
  
        if (next) {
          next.visited = true;
          stack.push(next);
          removeWalls(current, next);
        } else {
          stack.pop();
        }
      }
    }
  
    function removeWalls(a, b) {
      const x = a.col - b.col;
      if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
      } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
      }
  
      const y = a.row - b.row;
      if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
      } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
      }
    }
  
    function drawMaze(grid) {
      mazeElement.innerHTML = '';
      grid.forEach(row => {
        row.forEach(cell => {
          const cellElement = document.createElement('div');
          cellElement.classList.add('cell');
          if (cell.visited) {
            cellElement.classList.add('visited');
          }
          cellElement.style.borderTop = cell.walls[0] ? '2px solid black' : 'none';
          cellElement.style.borderRight = cell.walls[1] ? '2px solid black' : 'none';
          cellElement.style.borderBottom = cell.walls[2] ? '2px solid black' : 'none';
          cellElement.style.borderLeft = cell.walls[3] ? '2px solid black' : 'none';
          mazeElement.appendChild(cellElement);
        });
      });
    }
  
    generateButton.addEventListener('click', () => {
      const grid = createGrid(rows, cols);
      generateMaze(grid);
      drawMaze(grid);
    });
  
    const grid = createGrid(rows, cols);
    generateMaze(grid);
    drawMaze(grid);
  });