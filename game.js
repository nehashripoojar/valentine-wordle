const levels = [
    {
      answer: "SMILE",
      hint: "Something you do when you see me"
    },
    {
      answer: "ASIAN",
      hint: "My favorite cusine"
    },
    {
      answer: "KANDH",
      hint: "Your favorite nickname for me❤️"
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
    console.log("Loading level:", currentLevel);
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
  
  function updateBoard() {
    const tiles = document.querySelectorAll(".tile");
    let tileIndex = 0;
  
    for (let i = 0; i < guesses.length; i++) {
      const guessWord = guesses[i];
      for (let j = 0; j < WORD_LENGTH; j++) {
        tiles[tileIndex].textContent = guessWord[j];
        tileIndex++;
      }
    }
  
    for (let j = 0; j < guess.length; j++) {
      tiles[tileIndex].textContent = guess[j];
      tileIndex++;
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
    console.log("Guess:", guess, "Solution:", solution);
    if (guess === solution) {
      nextLevel();
    } else {
      guesses.push(guess);
      guess = "";
      updateBoard();
    }
  }
  
  function nextLevel() {
    currentLevel++;
    console.log("Moving to level:", currentLevel);
    if (currentLevel === levels.length) {
      console.log("Game complete! Showing popup");
      showPopup();
    } else {
      setTimeout(loadLevel, 800);
    }
  }
  
  function showPopup() {
    console.log("showPopup called");
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
  }
  
  // Initialize the game
  loadLevel();