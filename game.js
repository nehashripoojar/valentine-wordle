const levels = [
    {
      answer: "SMILE",
      hint: "Something you do when you see me"
    },
    {
      answer: "COFFEE",
      hint: "Our favorite excuse to meet ☕"
    },
    {
      answer: "KANDHU",
      hint: "The final answer ❤️"
    }
  ];
  
  let currentLevel = 0;
  

  const board = document.getElementById("board");
const hintEl = document.getElementById("hint");
const levelNum = document.getElementById("level-num");

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

let guess = "";
let guesses = [];
let solution = "";

function loadLevel() {
  board.innerHTML = "";
  guess = "";
  guesses = [];

  solution = levels[currentLevel].answer;
  hintEl.textContent = "Hint: " + levels[currentLevel].hint;
  levelNum.textContent = currentLevel + 1;

  for (let i = 0; i < MAX_GUESSES * WORD_LENGTH; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    board.appendChild(tile);
  }
}

document.addEventListener("keydown", (e) => {
  if (guess.length < WORD_LENGTH && /^[a-z]$/i.test(e.key)) {
    guess += e.key.toUpperCase();
    updateBoard();
  }

  if (e.key === "Enter" && guess.length === WORD_LENGTH) {
    submitGuess();
  }

  if (e.key === "Backspace") {
    guess = guess.slice(0, -1);
    updateBoard();
  }
});

function submitGuess() {
  if (guess === solution) {
    nextLevel();
  }
  guesses.push(guess);
  guess = "";
}

function nextLevel() {
  currentLevel++;
  if (currentLevel === levels.length) {
    showPopup();
  } else {
    setTimeout(loadLevel, 800);
  }
}

function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
  }
  