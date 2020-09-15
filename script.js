const game = (function () {
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let cells = document.querySelectorAll('.cell');
    let playerOne = [];
    let playerTwo = [];
    let endGameCard = document.querySelector('.end-game-card');
    let title = document.querySelector('.title');
    let formSection = document.querySelector('.form');
    let gameSection = document.querySelector('.game');
    let currentPlayerField = document.querySelector('.current-player');
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

    function gameLogic(element, index) {
        updateBoardState(index, playerSwitcher())
        populateCells(element, playerSwitcher());
        updateCurrentPlayer(playerSwitcher());

        if (checkWinner().winner || checkTie()) {
            let endGameParagraph = document.querySelector('.end-game-card>p');
            let winner = playerOne.playerSymbol == checkWinner().winningSymbol ? playerOne.playerName : playerTwo.playerName;

            title.classList.toggle('blur');
            endGameCard.classList.toggle('hidden');
            gameSection.classList.toggle('blur');

            if (checkWinner().winner) {
                endGameParagraph.textContent = `Congratulations ${winner}! You are the winner!`;
            } else {
                endGameParagraph.textContent = `No luck today, it's a tie!`
            }

            let restartButton = document.querySelector('.restart');
            restartButton.removeEventListener('click', game.restart);

            let clearButton = document.querySelector('.clear');
            clearButton.removeEventListener('click', game.clear);
        }
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
        if (boardState[i] == '') {
            boardState[i] = symbol;
        }
    };

    function checkWinner() {
        let winner = false;
        let winningSymbol;
        for (let i = 0; i < winCombinations.length; i++) {
            if ((boardState[winCombinations[i][0]] == boardState[winCombinations[i][1]]) && (boardState[winCombinations[i][0]] == boardState[winCombinations[i][2]]) && (boardState[winCombinations[i][0]] != '')) {
                winner = true;
                winningSymbol = boardState[winCombinations[i][0]];
            };
        };

        return {
            winner,
            winningSymbol
        };
    };

    function checkTie() {
        let tie = false;
        let isTheBoardFull = true;
        boardState.forEach(el => {
            if (el == '') {
                isTheBoardFull = false
            }
        })
        if (isTheBoardFull && !checkWinner().winner) {
            tie = true;
        }

        return tie;
    };

    function updateCurrentPlayer(symbol) {
        if (playerOne.playerSymbol == symbol) {
            currentPlayerField.textContent = playerOne.playerName || 'Player One';
        } else {
            currentPlayerField.textContent = playerTwo.playerName || 'Player Two';
        };
    };

    function startGame() {
        const randomNumber = Math.floor(Math.random() * (1 - 0 + 1)) + 0; // random between 0 and 1
        const symbolOne = randomNumber ? 'X' : 'O';
        const symbolTwo = symbolOne == 'X' ? 'O' : 'X';
        playerOne = player(symbolOne, 'One');
        playerTwo = player(symbolTwo, 'Two');
        updateCurrentPlayer(playerSwitcher())
    };

    function playerSwitcher() {
        let xCounter = 0;
        let oCounter = 0;
        cells.forEach(el => {
            if (el.textContent == 'X') {
                xCounter++
            };
            if (el.textContent == 'O') {
                oCounter++
            };
        });

        if ((xCounter - oCounter) <= 0) {
            return 'X';
        } else {
            return 'O';
        }
    }

    function clear() {
        cells.forEach(e => {
            e.textContent = '';
        })
        playerOne.playerSymbol = playerOne.playerSymbol == 'X' ? 'O' : 'X';
        playerTwo.playerSymbol = playerTwo.playerSymbol == 'X' ? 'O' : 'X';
        updateCurrentPlayer(playerSwitcher())
    }

    function restart() {
        playerOne = [];
        playerTwo = [];
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(e => {
            e.textContent = '';
        })
        document.querySelector(`#playerOneName`).value = '';
        document.querySelector(`#playerTwoName`).value = '';
        formSection.classList.toggle('hidden');
        gameSection.classList.toggle('hidden');

    }

    return {
        gameLogic,
        startGame,
        clear,
        restart,
        endGameCard,
        title
    };
})();

const interactionHandler = (function () {
    // cells interaction
    let cells = document.querySelectorAll('.cell');
    cells.forEach((el, i) => {
        el.addEventListener('click', (e) => {
            game.gameLogic(e.target, i);
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

    // clear
    let clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', game.clear);

    // restart
    let restartButton = document.querySelector('.restart');
    restartButton.addEventListener('click', game.restart);

    // end game restart
    let endCardCloseButton = document.querySelector('.end-game-close');
    endCardCloseButton.addEventListener('click', () => {
        game.endGameCard.classList.toggle('hidden');
        game.title.classList.toggle('blur');
        gameSection.classList.toggle('blur');
        game.restart()
    })
})();

const player = (symbol, order) => {
    const playerName = document.querySelector(`#player${order}Name`).value || `Player ${order}`;
    const playerSymbol = symbol
    return {
        playerName,
        playerSymbol
    }
}

// if cell != empty disable clicks
// div unutar forme za player/field ljevo desno
// render state?
// end card p id
// associate function to a var, check var state instead of running function every time
// rely on variables more than dom elements, objekt za sve query selectore, pozivati se na njega a ne svaki put selektr
// separate game logic and updating UI elements, dio za input, event listenere, ui
// query selector na outer container, sve ostalo query selector na to container.querySelectore u taj isti objekt sve funkcije staviti koje updateaju UI ili nesto i asociraju state uz varijablu, provjeravati varijable