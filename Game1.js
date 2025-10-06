// Get elements (keep your original class/id names)
const start = document.querySelector(".Start");
const re = document.querySelector(".re");
const GameCell = document.querySelectorAll(".box");
const inputX = document.getElementById("nameX");
const inputO = document.getElementById("nameO");
const statustext = document.getElementById("statustext");

let currentPlayer = "X";
let gameactive = false;
let playerXname = "Player X";
let playerOname = "Player O";

const winningpattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// ---------- Cell click handler (attached once) ----------
function handleCellClick(box) {
  // if game not active or box already filled -> ignore
  if (!gameactive || box.innerText !== "") return;

  // mark cell
  box.innerText = currentPlayer;
  box.disabled = true;

  // check winner
  const winner = checkWinner();
  if (winner) {
    const winnerName = winner === "X" ? playerXname : playerOname;
    statustext.textContent = `🏆 ${winnerName} Wins!`;
    gameactive = false;
    return;
  }

  // check draw
  if (checkDraw()) return;

  // switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const nextName = currentPlayer === "X" ? playerXname : playerOname;
  statustext.textContent = `👉 ${nextName}'s Turn`;
}

// attach listeners once, at load
GameCell.forEach((box) => {
  box.addEventListener("click", () => handleCellClick(box));
});

// ---------- Start Game Function ----------
function startgame() {
  playerXname = inputX.value.trim() || "Player X";
  playerOname = inputO.value.trim() || "Player O";
  statustext.textContent = `${playerXname} (X) vs ${playerOname} (O)`;
  currentPlayer = "X";
  gameactive = true;

  // reset board visuals
  GameCell.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "rgb(70, 62, 102)";
    box.style.color = "white";
  });

  // show whose turn
  statustext.textContent = `👉 ${playerXname}'s Turn`;
}

// ---------- Check Winner Function ----------
function checkWinner() {
  for (const pattern of winningpattern) {
    const pos1 = GameCell[pattern[0]].innerText;
    const pos2 = GameCell[pattern[1]].innerText;
    const pos3 = GameCell[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      // highlight winning cells
      GameCell[pattern[0]].style.backgroundColor = "lightgreen";
      GameCell[pattern[1]].style.backgroundColor = "lightgreen";
      GameCell[pattern[2]].style.backgroundColor = "lightgreen";
      return pos1;
    }
  }
  return null;
}

// ---------- Check Draw Function ----------
function checkDraw() {
  const isDraw = [...GameCell].every((b) => b.innerText !== "");
  if (isDraw && gameactive) {
    statustext.textContent = "🤝 It's a Draw!";
    gameactive = false;
    // highlight all cells for draw (optional)
    GameCell.forEach((box) => {
      box.style.backgroundColor = "gold";
    });
    return true;
  }
  return false;
}

// ---------- Restart Game Function ----------
function restartgame() {
  GameCell.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "rgb(70, 62, 102)";
    box.style.color = "black";
  });
  currentPlayer = "X";
  gameactive = false;
  statustext.textContent = "Game restarted!";
}

// ---------- Event listeners ----------
start.addEventListener("click", startgame);
re.addEventListener("click", restartgame);