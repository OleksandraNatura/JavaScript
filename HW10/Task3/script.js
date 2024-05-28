document.addEventListener('DOMContentLoaded', function () {
    const minefield = document.getElementById('minefield');
    const restartButton = document.getElementById('restart');
    const flagCountDisplay = document.getElementById('flag-count');
    let flagCount = 0;

    const SIZE = 8;
    const MINES_COUNT = 10;
    let cells, minePositions;

    function initializeGame() {
        cells = [];
        minePositions = new Set();
        flagCount = 0;
        flagCountDisplay.textContent = `${flagCount}/${MINES_COUNT}`;

        if (minefield) {
            minefield.innerHTML = '';
            minefield.style.gridTemplateColumns = `repeat(${SIZE}, 40px)`;
            minefield.style.gridTemplateRows = `repeat(${SIZE}, 40px)`;

            for (let i = 0; i < SIZE * SIZE; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                minefield.appendChild(cell);
                cells.push(cell);
            }

            while (minePositions.size < MINES_COUNT) {
                const randomIndex = Math.floor(Math.random() * SIZE * SIZE);
                minePositions.add(randomIndex);
            }

            cells.forEach(cell => {
                cell.addEventListener('click', handleLeftClick);
                cell.addEventListener('contextmenu', handleRightClick);
            });

            restartButton.style.display = 'none';
        } else {
            console.error('Element with id "minefield" not found');
        }
    }

    function handleLeftClick(event) {
        const index = parseInt(event.target.dataset.index);
        if (minePositions.has(index)) {
            revealMines();
            gameOver();
        } else {
            openCell(index);
        }
    }

    function handleRightClick(event) {
        event.preventDefault();
        const cell = event.target;
        if (!cell.classList.contains('open')) {
            if (cell.classList.contains('flag')) {
                cell.classList.remove('flag');
                flagCount--;
            } else {
                if (flagCount < MINES_COUNT) {
                    cell.classList.add('flag');
                    flagCount++;
                } else {
                    alert("Maximum number of flags reached!");
                }
            }
            flagCountDisplay.textContent = `${flagCount}/${MINES_COUNT}`;
        }
    }

    function openCell(index) {
        const cell = cells[index];
        if (cell.classList.contains('open') || cell.classList.contains('flag')) return;

        cell.classList.add('open');
        const mineCount = countMinesAround(index);

        if (mineCount > 0) {
            cell.textContent = mineCount;
        } else {
            const neighbors = getNeighbors(index);
            neighbors.forEach(neighborIndex => openCell(neighborIndex));
        }
    }

    function countMinesAround(index) {
        const neighbors = getNeighbors(index);
        return neighbors.filter(neighborIndex => minePositions.has(neighborIndex)).length;
    }

    function getNeighbors(index) {
        const neighbors = [];
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;

        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
                    const neighborIndex = r * SIZE + c;
                    if (neighborIndex !== index) {
                        neighbors.push(neighborIndex);
                    }
                }
            }
        }
        return neighbors;
    }

    function revealMines() {
        minePositions.forEach(index => {
            const cell = cells[index];
            cell.classList.add('mine');
        });
    }

    function gameOver() {
        cells.forEach(cell => {
            cell.removeEventListener('click', handleLeftClick);
            cell.removeEventListener('contextmenu', handleRightClick);
        });
        restartButton.style.display = 'block';
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});
