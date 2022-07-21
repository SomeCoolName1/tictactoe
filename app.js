const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageTextSpace = document.getElementById("winningMessage");
const restart = document.getElementById("restart");
const overlay = document.getElementById("overlay");
const xPlayer = document.getElementById("xPlayer");
const oPlayer = document.getElementById("oPlayer");

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

let circleTurn = false;

startGame();

restart.addEventListener("click", startGame);
xPlayer.addEventListener("click", xSelected);
oPlayer.addEventListener("click", oSelected);

function xSelected() {
  oPlayer.classList.remove("selected");
  xPlayer.classList.add("selected");
  circleTurn = false;
  startGame();
}

function oSelected() {
  xPlayer.classList.remove("selected");
  oPlayer.classList.add("selected");
  circleTurn = true;
  startGame();
}

function startGame() {
  //Loop through all cells
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true }); //only ever fire this eventlistener once
  });
  overlay.classList.remove("active");
  winningMessageTextSpace.textContent = "";
  setBoard();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const player = board.classList[1];
  placeMark(cell, currentClass);

  if (checkWinCondition(player) === "true") {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoard();
  }
}

//Add class to html
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoard() {
  oPlayer.classList.remove("selected");
  xPlayer.classList.remove("selected");
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
    oPlayer.classList.add("selected");
  } else {
    board.classList.add(X_CLASS);
    xPlayer.classList.add("selected");
  }
}

function checkWinCondition(player) {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      for (let k = 0; k < 9; k++)
        if (i != j && i != k && j != k)
          if (
            cellElements[i].classList[1] == player &&
            cellElements[j].classList[1] == player &&
            cellElements[k].classList[1] == player
          )
            if (
              parseInt(cellElements[i].id) +
                parseInt(cellElements[j].id) +
                parseInt(cellElements[k].id) ==
              15
            ) {
              return "true";
            }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    var winningMessageText = document.createElement("h1");
    winningMessageText.innerText = "Shit Draw";
    winningMessageTextSpace.appendChild(winningMessageText);
  } else {
    var winningMessageText = document.createElement("h1");
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    winningMessageTextSpace.appendChild(winningMessageText);
  }
  overlay.classList.add("active");

  overlay.addEventListener("click", removeOverlay);
}

function removeOverlay() {
  overlay.classList.remove("active");
  //removes shadow
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  //for every cell, you cannot click anymore
  cellElements.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
}

//array destructuring

//Check win condition
////endGame(false)

//else if is draw()
////endGame(true)

//else continue game
