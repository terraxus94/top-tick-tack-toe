const game = (function () {
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let startButton = document.querySelector('.start');
    let formSection = document.querySelector('.form');
    let gameSection = document.querySelector('.game');
    let clearButton = document.querySelector('.clear');
    let restartButton = document.querySelector('.restart');
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function gameLogic(element, index, symbol) {

    }

    function renderState(el) {
        let cells = document.querySelectorAll('.cell');
        el.forEach((element, index) => {
            cells[index].textContent = element;
        });
    };

    function populateCells(element, symbol) {
        if (element.textContent == '') {
            element.textContent = symbol;
        }
    };

    function updateBoardState(i, symbol) {
        boardState[i] = symbol;
    };

    function checkWinner() {
        let winner = false;
        for (let i = 0; i < winCombinations.length; i++) {
            if ((this.boardState[winCombinations[i][0]] == this.boardState[winCombinations[i][1]]) && (this.boardState[winCombinations[i][0]] == this.boardState[winCombinations[i][2]]) && (this.boardState[winCombinations[i][0]] != '')) {
                winner = true;
            };
        };
        return winner;
    };

    function checkTie() {
        let tie = false;
        let isTheBoardFull = true;
        this.boardState.forEach(el => {
            if (el == '') {
                isTheBoardFull = false
            }
        })
        if (isTheBoardFull && !checkWinner.winner) {
            tie = true;
        }
        return tie;
    }

    function startGame() {
        const randomNumber = Math.floor(Math.random() * (1 - 0 + 1)) + 0; // random between 0 and 1
        const symbolOne = randomNumber ? 'X' : 'O';
        const symbolTwo = symbolOne == 'X' ? 'O' : 'X';
        const playerOne = player(symbolOne, 'One');
        const playerTwo = player(symbolTwo, 'Two');

        console.log({ // remove this 
            playerOne,
            playerTwo
        });
        return {
            playerOne,
            playerTwo
        }

    };

    function playerSwitcher() {

    }

    return {
        renderState: renderState,
        populateCells: populateCells,
        checkWinner: checkWinner,
        updateBoardState: updateBoardState,
        checkTie: checkTie,
        playerSwitcher: playerSwitcher,
        gameLogic: gameLogic,
        startGame: startGame,
        boardState //for debugging purposes, remove afterwards
    };
})();



const interactionHandler = (function () {
    // cells interaction
    let cells = document.querySelectorAll('.cell');
    let eventObject;
    let cellIndex;
    cells.forEach((el, i) => {
        el.addEventListener('click', e => {
            eventObject = e.target;
            cellIndex = i;
            game.populateCells(eventObject, 'X');
            game.updateBoardState(cellIndex, 'X')
            game.checkWinner();
            game.checkTie();
            // game.gameLogic();
            return {
                eventObject,
                cellIndex
            };
        });
    });
    // starting the game
    let startButton = document.querySelector('.start');
    let formSection = document.querySelector('.form');
    let gameSection = document.querySelector('.game');
    startButton.addEventListener('click', () => {
        formSection.classList.toggle('hidden');
        gameSection.classList.toggle('hidden');
        game.startGame();
    })

})();

// first screen, player names or AI
// generate player objects with names, symbols
// player one gets random X or O, player 2 gets opposite
// X always plays first
// display player one / player two with highlight of whose turn it is
// upon winning pop up congrats player X, you won or it's a tie


const player = (symbol, order) => {
    const playerName = document.querySelector(`#player${order}Name`).value || `Player ${order}`;
    const playerSymbol = symbol
    return {
        playerName,
        playerSymbol
    }
}