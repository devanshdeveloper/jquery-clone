const board = $(".board");
const showTurn = $(".showTurn");
const game = $(".game");
let player1;
let player2;
let winner;
let isXTurn = true;

game.hide();
$("#nextBtn").click(() => {
  $(".inputPage").hide();
  game.hide(false);
  player1 = $("#inputPlayer1").val() || "X";
  player2 = $("#inputPlayer2").val() || "O";
  showTurn.html(`${currentPlayer()}'s Turn`);
});

useLoop(9, (i) =>
  $$$("div", board)
    .addClass("square")
    .html("")
    .click(() => updateGameBoard(i))
);

const squares = $(".square");

function updateGameBoard(i) {
  let square = squares.select(i);
  if (square.html() !== "" && !winner) {
    square.html(currentOperator());
    checkForWin();
    if (!winner) {
      isXTurn = !isXTurn;
      showTurn.html(`${currentPlayer()}'s Turn`);
    }
  }
}

function currentPlayer() {
  return isXTurn ? player1 : player2;
}

function currentOperator() {
  return isXTurn ? "X" : "O";
}

function checkForWin() {
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [3, 5, 8],
  ];
  let gameBoard = squares.html();
  wins.forEach((e) => {
    if (
      gameBoard[e[0]] === currentOperator() &&
      gameBoard[e[1]] === currentOperator() &&
      gameBoard[e[2]] === currentOperator()
    ) {
      winner = currentPlayer();
      squares.select(...e).style("color : red;");
      showTurn.html(`The Winner is ${winner}`);
    }
  });
  if (gameBoard.every((e) => e !== "")) {
    if (!winner) {
      winner = "tie";
      showTurn.html(`It's a tie`);
    }
  }
}
on("keypress", (e) => {
  let num = parseInt(e.key);
  if (!isNaN(num)) updateGameBoard(num);
});

$("#restartBtn").click(() => {
  squares.html("");
  isXTurn = true;
  winner = undefined;
  showTurn.html(currentPlayer() + "'s turn!!");
});
