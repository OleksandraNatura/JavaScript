document.addEventListener('DOMContentLoaded', () => {
  const minesweeper = document.getElementById('minesweeper');

  let mines = [];
  let flags = 0;
  let minesRemaining = 10;
  let gameStarted = false;

  function initialize() {
      mines = Array(8).fill().map(() => Array(8).fill(false));
      flags = 0;
      minesRemaining = 10;
      gameStarted = false;

      // Розміщуємо міни
      let placedMines = 0;
      while (placedMines < 10) {
          const randomRow = Math.floor(Math.random() * 8);
          const randomCol = Math.floor(Math.random() * 8);
          if (!mines[randomRow][randomCol]) {
              mines[randomRow][randomCol] = true;
              placedMines++;
          }
      }

      render();
  }

  function render() {
      minesweeper.innerHTML = '';

      for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
              const cell = document.createElement('div');
              cell.classList.add('cell');
              cell.dataset.row = i;
              cell.dataset.col = j;

              cell.addEventListener('click', handleLeftClick);
              cell.addEventListener('contextmenu', handleRightClick);

              if (mines[i][j] && gameStarted && !cell.classList.contains('flag')) {
                  cell.classList.add('hidden-mine');
              }

              minesweeper.appendChild(cell);
          }
          minesweeper.appendChild(document.createElement('br'));
      }

      const resetButton = document.createElement('button');
      resetButton.textContent = 'Почати гру заново';
      resetButton.addEventListener('click', initialize);
      minesweeper.appendChild(resetButton);

      const flagsCount = document.createElement('div');
      flagsCount.textContent = `Встановлено прапорців: ${flags}/${minesRemaining}`;
      minesweeper.appendChild(flagsCount);
  }

  function handleLeftClick(event) {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);

      if (!gameStarted) {
          gameStarted = true;
      }

      if (mines[row][col]) {
          revealAllMines();
          alert('Гра закінчена! Ви програли.');
          event.target.classList.add('hidden-mine');
          initialize();
      } else {
          const adjacentMines = countAdjacentMines(row, col);
          event.target.textContent = adjacentMines === 0 ? '' : adjacentMines;
      }
  }

  function handleRightClick(event) {
      event.preventDefault();

      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);

      if (!gameStarted) {
          gameStarted = true;
      }

      if (event.target.classList.contains('flag')) {
          event.target.classList.remove('flag');
          flags--;
          minesRemaining++;
      } else {
          event.target.classList.add('flag');
          flags++;
          minesRemaining--;
      }

      updateFlagsCount();
  }

  function countAdjacentMines(row, col) {
      let count = 0;

      for (let i = Math.max(0, row - 1); i <= Math.min(7, row + 1); i++) {
          for (let j = Math.max(0, col - 1); j <= Math.min(7, col + 1); j++) {
              if (mines[i][j]) count++;
          }
      }

      return count;
  }

  function revealAllMines() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
          const row = parseInt(cell.dataset.row);
          const col = parseInt(cell.dataset.col);

          if (mines[row][col]) {
              cell.classList.add('mine');
              cell.textContent = '💣';
          }
          cell.removeEventListener('click', handleLeftClick);
          cell.removeEventListener('contextmenu', handleRightClick);
      });
  }

  function updateFlagsCount() {
      const flagsCount = document.querySelector('div:nth-child(3)');
      flagsCount.textContent = `Встановлено прапорців: ${flags}/${minesRemaining}`;
  }

  initialize();
});
