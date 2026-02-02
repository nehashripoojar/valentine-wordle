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
  
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  let guess = "";
  let guesses = [];
  let solution = "";
  let letterStates = {}; // Track letter states: correct, wrong-position, not-in-word
  
  function loadLevel() {
    console.log("Loading level:", currentLevel, "Total levels:", levels.length);
    
    if (currentLevel >= levels.length) {
      console.log("Game already completed!");
      return;
    }
    
    board.innerHTML = "";
    guess = "";
    guesses = [];
    letterStates = {};
  
    solution = levels[currentLevel].answer;
    hintEl.textContent = "Hint: " + levels[currentLevel].hint;
    levelNum.textContent = currentLevel + 1;
  
    // Create game board tiles
    for (let i = 0; i < MAX_GUESSES * WORD_LENGTH; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      board.appendChild(tile);
    }
    
    // Create keyboard
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
        guess += letter;
        updateBoard();
      });
      keyboard.appendChild(key);
    });
  }
  
  function updateBoard() {
    const tiles = document.querySelectorAll(".tile");
    let tileIndex = 0;
  
    // Display previous guesses
    for (let i = 0; i < guesses.length; i++) {
      const guessWord = guesses[i];
      for (let j = 0; j < WORD_LENGTH; j++) {
        tiles[tileIndex].textContent = guessWord[j];
        tileIndex++;
      }
    }
  
    // Display current guess
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
    
    // Update letter states
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const keyElement = document.getElementById(`key-${letter}`);
      
      if (guess[i] === solution[i]) {
        // Correct position
        letterStates[letter] = "correct";
        keyElement.classList.add("correct");
      } else if (solution.includes(letter)) {
        // Wrong position
        if (letterStates[letter] !== "correct") {
          letterStates[letter] = "wrong-position";
          keyElement.classList.add("wrong-position");
        }
      } else {
        // Not in word
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
      console.log("Game complete! Showing popup");
      showPopup();
    } else {
      setTimeout(loadLevel, 800);
    }
  }
  
  function showPopup() {
    console.log("showPopup called - Game Completed!");
    const popup = document.getElementById("popup");
    popup.classList.remove("hidden");
  }
  
  loadLevel();