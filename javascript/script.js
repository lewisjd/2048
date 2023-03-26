// Define the Cell class
class Cell {
    constructor(value) {
        this.value = value; // Initialize the value of the cell
    }
}

// Get the grid element from the DOM
const grid = document.querySelector(".grid");

// Create the grid with 16 cells
function createGrid() {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div"); // Create a div element for each cell
        cell.classList.add("cell"); // Add the "cell" class to the div element
        cell.textContent = ""; // Set the text content of the cell to an empty string
        grid.appendChild(cell); // Append the cell to the grid
    }
}

// Add a random number to the board
function addRandomNumber() {
    const emptyCell = getRandomEmptyCell(); // Get a random empty cell
    if (emptyCell) {
        emptyCell.value = Math.random() < 0.9 ? 2 : 4; // Assign a 2 or 4 to the cell, with a 90% chance of 2
    }
}

// Move cells in a specific direction
function move(direction) {
    // Implement the logic to move cells based on the direction
}

// Check if the game is over
function isGameOver() {
    // Implement the logic to check if the game is over
}

// Handle the keydown event for arrow keys
function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        default:
            return;
    }
    addRandomNumber(); // Add a random number after each move
    if (board.firstMove) {
        addRandomNumber(); // Add a second random number if it's the first move
        board.firstMove = false; // Update the flag to indicate the first move has been made
    }
    updateUI(); // Update the user interface
    
    if (isGameOver()) { // Check if the game is over
        alert('Game Over');
    }
}

// Update the user interface
function updateUI() {
    const cells = grid.querySelectorAll(".cell"); // Get all the cell elements from the grid
    
    // Update each cell's text content and background color
    for (let i = 0; i < 16; i++) {
        const cell = cells[i];
        cell.textContent = board[i].value || "";
        cell.style.backgroundColor = getCellBackgroundColor(board[i].value);
    }
}

// Get the background color for a specific cell value
function getCellBackgroundColor(value) {
    switch (value) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#edc850";
        case 1024:
            return "#edc53f";
        case 2048:
            return "#edc22e";
        default:
            return "#ccc0b3";
    }
}

// Initialize the board with empty cells
function initializeBoard() {
    const board = [];
    
    for (let i = 0; i < 16; i++) {
        board.push(new Cell(0)); // Create a new cell with a value of 0 and add it to the board
    }
    board.firstMove = true; // Add a flag to indicate the first move
    return board;
}

// Convert row and column to a single index for the board
function getBoardIndex(row, col) {
    return row * 4 + col;
}

// Convert a single index to its corresponding row and column on the board
function getBoardPosition(index) {
    return {
        row: Math.floor(index / 4),
        col: index % 4
    };
}

// Find a random empty cell on the board
function getRandomEmptyCell() {
    const emptyCells = [];
    
    // Iterate through the board to find empty cells
    for (let i = 0; i < 16; i++) {
        if (board[i].value === 0) {
            emptyCells.push(i);
        }
    }
    
    // Return null if there are no empty cells
    if (emptyCells.length === 0) {
        return null;
    }
    
    // Choose a random empty cell from the available empty cells
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return board[emptyCells[randomIndex]];
}

// Move cells on the board based on the provided direction
function move(direction) {
    let hasMoved = false;
    
    // Check if the direction is 'up' or 'left' and iterate through the board accordingly
    if (direction === 'up' || direction === 'left') {
        for (let i = 0; i < 16; i++) {
            hasMoved = moveCell(i, direction) || hasMoved;
        }
    } else { // If the direction is 'down' or 'right', iterate through the board in reverse order
        for (let i = 15; i >= 0; i--) {
            hasMoved = moveCell(i, direction) || hasMoved;
        }
    }
    // If any cell has moved, add a random number to the board
    if (hasMoved) {
        addRandomNumber();
    }
}
        
// Move a cell based on the given index and direction
function moveCell(index, direction) {
    const { row, col } = getBoardPosition(index);
    let newRow = row;
    let newCol = col;

    // Update the row and column based on the direction
    switch (direction) {
        case 'up':
            newRow -= 1;
            break;
        case 'down':
            newRow += 1;
            break;
        case 'left':
            newCol -= 1;
            break;
        case 'right':
            newCol += 1;
            break;
    }
    
    // Check if the new position is within the board boundaries
    if (newRow < 0 || newRow > 3 || newCol < 0 || newCol > 3) {
        return false;
    }
    
    const newIndex = getBoardIndex(newRow, newCol);
    const currentCell = board[index];
    const targetCell = board[newIndex];
    
    // Move the cell if the target cell is empty or has the same value
    if (targetCell.value === 0) {
        targetCell.value = currentCell.value;
        currentCell.value = 0;
        moveCell(newIndex, direction);
        return true;
    } else if (targetCell.value === currentCell.value) {
        targetCell.value *= 2;
        currentCell.value = 0;
        return true;
    } else {
        return false;
    }
}

// Check if the game is over (no empty cells or possible moves)
function isGameOver() {
    for (let i = 0; i < 16; i++) {
        if (board[i].value === 0) {
            return false;
        }

        const { row, col } = getBoardPosition(i);
        const directions = [
            { dr: -1, dc: 0 },
            { dr: 1, dc: 0 },
            { dr: 0, dc: -1 },
            { dr: 0, dc: 1 },
        ];

        // Check if there are any possible moves for the current cell
        for (const { dr, dc } of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
    
            if (newRow >= 0 && newRow <= 3 && newCol >= 0 && newCol <= 3) {
                const newIndex = getBoardIndex(newRow, newCol);
                if (board[i].value === board[newIndex].value) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Initialize the board with empty cells
const board = initializeBoard();

// Create the visual grid of cells on the screen
createGrid();

// Add two random numbers (2 or 4) to the board at the beginning
addRandomNumber();
addRandomNumber();

// Update the user interface to reflect the current state of the board
updateUI();

// Listen for keydown events to handle user input for moving cells
document.addEventListener("keydown", handleKeydown);
