const gameBoard = (function() {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
        ];
    
    let gameOver = false;    
    
    const makeMove = (row, col, marking) => {
        board[row][col] = marking;
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
        checkWinner
    }
  })();

  //Create player object
  //Players have names, scores, markers
  function createUser (name) {
    const playerName = name;
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    return { name, getScore, increaseScore };
  }
  //Create game
  //Gamestarts, game ends, game checks for wins
  //Game checks for ties
  //Game updates player scores after it is done
  function game(){
   //Create gameboard

  //Create players
    player1 = createUser("Adam");
    player2 = createUser("Becca");
    let currentPlayer = player1;
    let turn = 1;
  //Make moves, check wins
    while(true){
        gameBoard.makeMove(
        prompt(currentPlayer.name +" Row"), 
        prompt(currentPlayer.name +" Col"),
        prompt(currentPlayer +" Marker"));
        gameBoard.printBoard();

        if(gameBoard.checkWinner()){
            window.alert(currentPlayer + "WINS!");
            break;
        }
        if(turn == 9){
            window.alert("It's a tie");
            break;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        ++turn;
    }
  //update scores, refresh board



  }
