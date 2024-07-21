const gameBoard = (function() {
const createEmptyBoard = () => [
    ["","",""],
    ["","",""],
    ["","",""]
];

    let board = createEmptyBoard();
    
    const makeMove = (row, col, marking) => {
        board[row][col] = marking;
    };

    const resetBoard = () => {
        board = createEmptyBoard();
    };

    const printBoard = () => {
        console.log(board)
    };
    

    const checkLine = (a, b, c) => {
        return a === b && b === c && a !== "";
    };


    const checkWinner = () => {
        
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (checkLine(board[i][0], board[i][1], board[i][2])) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (checkLine(board[0][i], board[1][i], board[2][i])) {
                return true;
            }
        }

        // Check diagonals
        if (checkLine(board[0][0], board[1][1], board[2][2])) {
            return true;
        }

        if (checkLine(board[0][2], board[1][1], board[2][0])) {
            return true;
        }

        return null;
    };

    return {
        makeMove,
        printBoard,
        checkWinner,
        resetBoard
    }
  })();

  //Create player object
  //Players have names, scores, markers
  function createUser (name, marker) {
    const playerName = name;
    const playerMarker = String(marker);
    let score = 0;
    
    const getScore = () => score;
    const increaseScore = () => score++;
    return { name, getScore, increaseScore, playerMarker };
  }
  //Create game
  function game(player1Name, player2Name ) {
   
    // Create players
    const player1 = createUser(player1Name, "X");
    const player2 = createUser(player2Name, "O");
    let currentPlayer = player1;
    let gameOver = false;    

    //Set player names on board
    document.getElementById('player1_name').textContent = player1Name;
    document.getElementById('player2_name').textContent = player2Name;

        function resetGame() {

            // Clear the game board
            gameBoard.resetBoard();

            gameInstance.gameOver = false;
        
            // Clear the board display
            const squares = document.querySelectorAll('.square');
            squares.forEach(square => {
                square.textContent = '';

            });
        }
        
    function updateScores() {
        document.getElementById('player1_name').textContent = player1Name;
        document.getElementById('player2_name').textContent = player2Name;
        document.getElementById('player1-score').textContent = player1.getScore();
        document.getElementById('player2-score').textContent = player2.getScore();
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchCurrentPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    return { getCurrentPlayer, switchCurrentPlayer, resetGame, updateScores, player1, player2,gameOver };
}


// Display controller to handle the game display and interactions
function displayController(gameInstance) {
    const displayBoard = document.getElementById("board");
    const squares = displayBoard.querySelectorAll('.square');
    const newGameButton = document.querySelector('#newGame button');

    newGameButton.addEventListener('click', () => {
        gameInstance.resetGame();
    });

    // Function to handle square click
    function handleSquareClick(event) {
        const square = event.target;

        // If no marking, get the current player's marking
        if (square.textContent == "" && gameInstance.gameOver != true) {
            // Add the player's marking to the display
            square.textContent = gameInstance.getCurrentPlayer().playerMarker; 

            // Make move on game board
            const row = parseInt(square.getAttribute('data-row'));
            const col = parseInt(square.getAttribute('data-col'));
            gameBoard.makeMove(row, col, gameInstance.getCurrentPlayer().playerMarker);

            // Check for a winner / tie
            if (gameBoard.checkWinner()) {
                window.alert(gameInstance.getCurrentPlayer().name + " WINS!");
                gameInstance.getCurrentPlayer().increaseScore();
                gameInstance.updateScores();
                gameInstance.gameOver = true;
            } else   
            if (Array.from(squares).every(square => square.textContent !== "")) {
                window.alert("It's a tie");
                gameInstance.gameOver = true;
            } else {
                // Switch the current player
                gameInstance.switchCurrentPlayer();
            }
        }
    }

    // Add event listeners to each square
    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
}



document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('player-form');
    
    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting the traditional way
        event.preventDefault(); 
        
        const player1Name = document.getElementById('player1-name').value;
        const player2Name = document.getElementById('player2-name').value;
        
        // Initialize the game with player names
        gameInstance = game(player1Name, player2Name);
        displayController(gameInstance);
        
        // Hide and show
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('score-board').style.display = 'flex'; 
        document.getElementById('board').style.display = 'grid';
        document.getElementById('newGame').style.display = 'flex'; 
        document.getElementById('header').style.display = 'none';
    });
});