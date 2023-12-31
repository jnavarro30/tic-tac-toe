const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infoDisplay.innerHTML = `<span id="shape" style="color: blue;">${go}</span> goes first`;

(function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
})();

function addGo(e) {
  const squareClass = e.target.classList[0];
  const squareChild = e.target.children[0];

  if (squareChild || ["circle", "cross"].includes(squareClass)) return;

  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  let color = go === "circle" ? "blue" : "red";
  infoDisplay.innerHTML = `It is now <span id="shape">${go}</span>'s turn`;
  document.querySelector("#shape").style.color = color;

  e.target.addEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      infoDisplay.innerHTML = `<span id="shape" style="color: blue;">Circle</span> Wins!`;
      document.querySelector("body").style.backgroundColor = "blue";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      infoDisplay.innerHTML = `<span id="shape" style="color: red;">Cross</span> Wins!`;
      document.querySelector("body").style.backgroundColor = "red";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  const fiveCircles = document.querySelectorAll(".circle");
  if (fiveCircles.length === 5) {
    infoDisplay.textContent = "Tie Game!";
  }
}
