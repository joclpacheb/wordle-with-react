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
    // if (gameOver || gameWon) return; // Don't evaluate if the game is over or won

    // Avoiding direct mutation
    const newGridData = [...gridData];

    //Validation: Checking if the already validated input text by the player is valid
    if (currentInput.length !== WORD_LENGTH) {
      alert("Please enter a full " + WORD_LENGTH + "-letter word.");
      return;
    }

    // For debugging: This logs the player's input and the chosen answer
    console.log("Evaluating the user-typed word:", currentInput);
    console.log("Answer word is:", answerWord);

    // Fills the active row with user input and sets corresponding class names
    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = currentInput[i];
      const isCorrect = char === answerWord[i];

      newGridData[activeRow][i] = {
        letter: char,
        status: isCorrect ? "correct" : "incorrect", // Match CSS classes for "green" and "gray" if "correct" or "incorrect" respectively
      };
    }

    setGridData(newGridData);
    setCurrentInput(""); // Resets input
    setGridData(newGridData); // Updates the state with new grid data



    // Checks if the word was guessed correctly
    if (currentInput === answerWord) {
      setGameWon(true);

      return; // Skip further evaluation if the game is won
    }

    // Moves to the next row 
    setActiveRow((prevRow) => prevRow + 1);

    console.log("Current row is:", activeRow);

    // Resets input box
    setCurrentInput("");

    // Checks if the game is over (if the player reached the last row without winning)
    if (activeRow + 1 >= MAX_ATTEMPTS) {
      setGridData(newGridData);
      setGameOver(true);
      setTimeout(() => {

      }, 100);
    }
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
  return (
    <div className="wordle">
      <h1>Wordle</h1>
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
            setCurrentInput(inputValue.toUpperCase()); //Validation: Converting user-typed word to uppercase  
          }}
        />
        <button onClick={handleEvaluateClick}>EVALUATE</button>
      </div>

      {/* Game Grid */}
      {gameOver === false && gameWon == false && (
        <div className="grid">
          {gridData.map((row, attemptIndex) => (
            <div key={attemptIndex} className="row">
              {row.map((cell, letterIndex) => (
                <div
                  key={letterIndex}
                  className={`cell ${cell.status}`}// Applying correct/incorrect styling for the cell backgrounds
                >
                  {cell.letter}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {/* Display Game Over message */}
      {gameWon && (
        <div className="game-won">
          <h2>You Win!</h2>
          <p>You guessed the right word: ({answerWord}).</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>The right word was: ({answerWord}).</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};
export default WordleGame;
