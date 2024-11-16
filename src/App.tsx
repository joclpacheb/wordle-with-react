import React, { useState, useEffect } from "react";
import "./app.scss";
/*
Wordle
------
Game Rules:
1. Player has 6 attempts to guess a 5-letter word
2. Guesses are entered by pressing Enter, after which the guess score appears
    and the following row becomes the active row. Each guess must be a valid word.
2. The scoring is communicated through the background color of each letter:
   - Green: Letter is correct and in right position
   - Yellow: Letter is in word but wrong position
   - Gray: Letter is not in word
3. The player wins the game once they successfully guess the word. The player loses
    if they are not able to guess the word within 6 attempts.
*/

const ANSWER_WORD_BANK = ["CLOUD", "DREAM", "SWEET", "FLOAT"];
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

// TODO: Implement GameState (typescript)
// interface GameState { }

const WordleGame: React.FC = () => { // (typescript syntax)
  const [currentInput, setCurrentInput] = useState("");
  const [answerWord, setAnswerWord] = useState(""); // State for the chosen answer word
  const [activeRow, setActiveRow] = useState(0);
  const [gameOver, setGameOver] = useState(false); // State to track if the game is over
  const [gameWon, setGameWon] = useState(false); // State to track if the game is won

  const initialGridData = Array.from({ length: MAX_ATTEMPTS }, () =>
    Array.from({ length: WORD_LENGTH }, () => ({ letter: "", status: "" }))
  );
  const [gridData, setGridData] = useState(initialGridData);

  // Function to pick a random word from the word bank 
  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * ANSWER_WORD_BANK.length);
    return ANSWER_WORD_BANK[randomIndex];
  };

  // Initializing the answer word 
  useEffect(() => {
    const word = pickRandomWord();
    setAnswerWord(word);
    console.log("The chosen answer word is:", word); // Debugging log
  }, []);

  // Function to handle the click event of the EVALUATE button
  const handleEvaluateClick = () => {
    // Avoiding direct mutation
    const newGridData = [...gridData];

    // Validation: Ensures if the (already validated) typed input text is valid
    if (currentInput.length !== WORD_LENGTH) {
      alert("Please enter a full " + WORD_LENGTH + "-letter word.");
      return;
    }

    // For debugging: This logs the player's input and the chosen answer
    console.log("Evaluating the user-typed word:", currentInput);
    console.log("Answer word is:", answerWord);

    // FIRST PASS: Mark correct letters (green) and track used letters in answer
    const answerWordCopy = answerWord.split("");
    let wordGuessedCorrectly = true; // Flag to track if the word is guessed correctly

    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = currentInput[i];
      const isCorrect = char === answerWord[i];

      newGridData[activeRow][i] = {
        letter: char,
        status: isCorrect ? "correct" : "incorrect", // Correct => green, Incorrect => gray
      };

      if (!isCorrect) wordGuessedCorrectly = false; // Mark flag as false if not correct

      // Remove matched letter from answerWordCopy to avoid double counting for yellow
      if (isCorrect) {
        answerWordCopy[i] = ""; // Mark letter as used
      }
    }

    // SECOND PASS: Mark imprecise (yellow) letters (right letter, wrong position)
    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = currentInput[i];
      if (newGridData[activeRow][i].status === "incorrect") {
        // Check if the letter exists in the word but is in the wrong position then it's an imprecise match
        const indexInAnswer = answerWordCopy.indexOf(char);
        if (indexInAnswer !== -1) {
          newGridData[activeRow][i] = {
            letter: char,
            status: "imprecise", // Mark as yellow
          };
          answerWordCopy[indexInAnswer] = ""; // Remove letter from answerWordCopy to avoid reusing it
        }
      }
    }

    // Updates the grid with new status
    setGridData(newGridData); // Updates the state with new grid data

    // GAME WON: Checks if the word was guessed correctly
    if (wordGuessedCorrectly) {
      setGameWon(true);
      console.log("Game won.");
      return; // Skip further evaluation to prevent triggering the game over condition
    }

    // GAMEOVER: Checks if the game is over (if the player reached the last row without winning)
    if (activeRow + 1 >= MAX_ATTEMPTS) {
      setGridData(newGridData);
      setGameOver(true);
      console.log("Game Over.");
      return; // Skip row increment if game is over
    }

    // Moves to the next row
    setActiveRow((prevRow) => prevRow + 1);
    console.log("Current row is:", activeRow);

    // Resets input box (this happens last so the game won check can happen before resetting the input)
    setCurrentInput("");
  };

  // Function to reset the game
  const resetGame = () => {
    setGameOver(false); // Reset the game over state
    setGameWon(false); // Reset the game over state

    setActiveRow(0); // Reset active row
    setGridData(initialGridData); // Reset the grid data
    setCurrentInput(""); // Clear input box
    setAnswerWord(pickRandomWord()); // Pick a new word
    console.log("Game has been reset.");
  };

  // Rendering the game component
  return (
    <div className="wordle">
      <h1>Wordle</h1>


      {/* Game Grid */}
      {gameOver === false && gameWon == false && (
        <div className="grid-wrapper">
          <div className="inputs-container">
            {/* Validation: accepting input that has n°(WORD_LENGTH) letters only from the player */}
            <input
              className="input-box"
              type="text"
              maxLength={WORD_LENGTH}
              pattern="[a-zA-Z]*"
              value={currentInput}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^a-zA-Z]/g, '');
                setCurrentInput(inputValue.toUpperCase()); // Validation: Converting user-typed word to uppercase  
              }}
            />
            <button onClick={handleEvaluateClick}>EVALUATE</button>
          </div>
          <div className="grid">
            {gridData.map((row, attemptIndex) => (
              <div key={attemptIndex} className="row">
                {row.map((cell, letterIndex) => (
                  <div
                    key={letterIndex}
                    className={`cell ${cell.status}`} // Applying correct/incorrect styling for the cell backgrounds
                  >
                    {cell.letter}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

      )


      }

      {/* Game Won/Game Over messages */}
      {gameWon && (
        <div className="game-won">
          <h2>You Win!</h2>
          <p>You guessed the right word: {answerWord}.</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>The right word was: {answerWord}.</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};
export default WordleGame;
