class Cell {
    constructor(value) {
        this.value = value;
    }
}

const grid = document.querySelector(".grid");

function createGrid() {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = "";
        grid.appendChild(cell);
    }
}

function getRandomEmptyCell() {
    // Implement logic to get a random empty cell
}

function addRandomNumber() {
    const emptyCell = getRandomEmptyCell();
    if (emptyCell) {
        emptyCell.value = Math.random() < 0.9 ? 2 : 4;
    }
}

function move(direction) {
    // Implement the logic to move cells based on the direction
}

function isGameOver() {
    // Implement the logic to check if the game is over
}

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
    addRandomNumber();
    updateUI();
    
    if (isGameOver()) {
    alert('Game Over');
    }
}
    
function updateUI() {
    const cells = grid.querySelectorAll(".cell");
    
    for (let i = 0; i < 16; i++) {
    const cell = cells[i];
    cell.textContent = board[i].value || "";
    cell.style.backgroundColor = getCellBackgroundColor(board[i].value);
    }
}
    
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

function initializeBoard() {
    const board = [];
    
    for (let i = 0; i < 16; i++) {
    board.push(new Cell(0));
    }
    return board;
}

function getBoardIndex(row, col) {
    return row * 4 + col;
}

function getBoardPosition(index) {
    return {
        row: Math.floor(index / 4),
        col: index % 4
    };
}

function getRandomEmptyCell() {
    const emptyCells = [];
    
    for (let i = 0; i < 16; i++) {
        if (board[i].value === 0) {
            emptyCells.push(i);
        }
    }
    
    if (emptyCells.length === 0) {
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return board[emptyCells[randomIndex]];
}

function move(direction) {
    let hasMoved = false;
    
    if (direction === 'up' || direction === 'left') {
        for (let i = 0; i < 16; i++) {
        hasMoved = moveCell(i, direction) || hasMoved;
        }
    } else {
        for (let i = 15; i >= 0; i--) {
            hasMoved = moveCell(i, direction) || hasMoved;
        }
    }
    if (hasMoved) {
        addRandomNumber();
    }
}
        
function moveCell(index, direction) {
    const { row, col } = getBoardPosition(index);
    let newRow = row;
    let newCol = col;

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
    
    if (newRow < 0 || newRow > 3 || newCol < 0 || newCol > 3) {
        return false;
    }
    
    const newIndex = getBoardIndex(newRow, newCol);
    const currentCell = board[index];
    const targetCell = board[newIndex];
    
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

const board = initializeBoard();
createGrid();
addRandomNumber();
addRandomNumber();
updateUI();
document.addEventListener("keydown", handleKeydown);