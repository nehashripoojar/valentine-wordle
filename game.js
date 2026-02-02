const levels = [
    {
      answer: "SMILE",
      hint: "Something you do when you see me"
    },
    {
      answer: "ASIAN",
      hint: "My favorite cuisine to try with you 🍜"
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
  const keyboard = document.getElementById("keyboard");
  const gameContainer = document.getElementById("game-container");
  const finalScreen = document.getElementById("final-screen");
  const celebrationScreen = document.getElementById("celebration-screen");
  const yesBtn = document.getElementById("yes-btn");
  const obviouslyBtn = document.getElementById("obviously-btn");
  
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  let guess = "";
  let guesses = [];
  let solution = "";
  let letterStates = {};
  let tiles = [];
  
  // Ensure game container is visible on load
  gameContainer.classList.remove("hidden");
  finalScreen.classList.add("hidden");
  celebrationScreen.classList.add("hidden");
  
  console.log("Game initialized - currentLevel:", currentLevel);
  
  function loadLevel() {
    console.log("Loading level:", currentLevel, "Total levels:", levels.length);
    
    if (currentLevel >= levels.length) {
      console.log("Game already completed!");
      return;
    }
    
    // Ensure game container is visible
    gameContainer.classList.remove("hidden");
    finalScreen.classList.add("hidden");
    celebrationScreen.classList.add("hidden");
    
    board.innerHTML = "";
    guess = "";
    guesses = [];
    letterStates = {};
  
    solution = levels[currentLevel].answer;
    hintEl.textContent = "Hint: " + levels[currentLevel].hint;
    levelNum.textContent = currentLevel + 1;
  
    // Create game board tiles
    tiles = [];
    for (let i = 0; i < MAX_GUESSES * WORD_LENGTH; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      board.appendChild(tile);
      tiles.push(tile);
    }
    
    createKeyboard();
  }
  
  function createKeyboard() {
    keyboard.innerHTML = "";
    ALPHABET.forEach(letter => {
      const key = document.createElement("button");
      key.textContent = letter;
      key.className = "key";
      key.id = `key-${letter}`;
      key.addEventListener("click", () => {
        if (guess.length < WORD_LENGTH) {
          guess += letter;
          updateBoard();
        }
      });
      keyboard.appendChild(key);
    });
  }
  
  function updateBoard() {
    let tileIndex = 0;
  
    // Clear all tiles first
    tiles.forEach(tile => {
      tile.textContent = "";
      tile.classList.remove("correct", "wrong-position", "not-in-word");
    });
  
    // Reset tileIndex
    tileIndex = 0;
  
    // Display previous guesses with colors
    for (let i = 0; i < guesses.length; i++) {
      const guessWord = guesses[i];
      for (let j = 0; j < WORD_LENGTH; j++) {
        const letter = guessWord[j];
        tiles[tileIndex].textContent = letter;
        
        // Color the tile based on letter state
        if (letter === solution[j]) {
          tiles[tileIndex].classList.add("correct");
        } else if (solution.includes(letter)) {
          tiles[tileIndex].classList.add("wrong-position");
        } else {
          tiles[tileIndex].classList.add("not-in-word");
        }
        
        tileIndex++;
      }
    }
  
    // Display current guess
    for (let j = 0; j < guess.length; j++) {
      tiles[tileIndex].textContent = guess[j];
      tiles[tileIndex].classList.remove("correct", "wrong-position", "not-in-word");
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
    
    // Update letter states for keyboard
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const keyElement = document.getElementById(`key-${letter}`);
      
      if (guess[i] === solution[i]) {
        letterStates[letter] = "correct";
        keyElement.classList.add("correct");
      } else if (solution.includes(letter)) {
        if (letterStates[letter] !== "correct") {
          letterStates[letter] = "wrong-position";
          keyElement.classList.add("wrong-position");
        }
      } else {
        if (!letterStates[letter]) {
          letterStates[letter] = "not-in-word";
          keyElement.classList.add("not-in-word");
        }
      }
    }
    
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
    console.log("Moving to level:", currentLevel, "Total levels:", levels.length);
    
    if (currentLevel === levels.length) {
      console.log("Game complete! Showing final screen");
      showFinalScreen();
    } else {
      setTimeout(loadLevel, 800);
    }
  }
  
  function showFinalScreen() {
    console.log("Showing final screen");
    gameContainer.classList.add("hidden");
    finalScreen.classList.remove("hidden");
    celebrationScreen.classList.add("hidden");
  }
  
  function showCelebration() {
    console.log("Showing celebration screen");
    gameContainer.classList.add("hidden");
    finalScreen.classList.add("hidden");
    celebrationScreen.classList.remove("hidden");
    createConfetti();
  }
  
  function createConfetti() {
    const confettiPieces = 50;
    for (let i = 0; i < confettiPieces; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.delay = Math.random() * 0.5 + "s";
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
  // Button event listeners
  yesBtn.addEventListener("click", showCelebration);
  obviouslyBtn.addEventListener("click", showCelebration);
  
  // Initialize the game
  loadLevel();