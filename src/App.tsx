import React, { useState,useEffect } from "react";
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
// const EMPTY_CELL = "";

// TODO: Implement GameState (typescript)
// interface GameState { }
// TODO: Implement the Wordle component

const WordleGame: React.FC = () => { // (typescript syntax)
  const [currentInput, setCurrentInput] = useState("");
  const [answerWord, setAnswerWord] = useState(""); // State for the chosen answer word

  // const letters = Array(WORD_LENGTH).fill(EMPTY_CELL); // filling the cells with empty spaces

  // Function to pick a random word from the word bank
  const pickRandomWord = () => { //This will randomly pick one of the words from the bank upon application run/reload
    const randomIndex = Math.floor(Math.random() * ANSWER_WORD_BANK.length);
    return ANSWER_WORD_BANK[randomIndex];
  };
  // Initializing the answer word on component initialization
  useEffect(() => {
    const word = pickRandomWord();
    setAnswerWord(word);
    console.log("The chosen answer word is:", word); // Debugging log
  }, []);

  // Function to handle the click event of the evaluate button
  const handleEvaluateClick = () => {
    if (currentInput === "") { //Validation: Checking if the already validated input text is blank
      alert("Please enter a word.");
      return;
    }

    // For debugging: This logs the player's input and the chosen answer
    console.log("Evaluating the user-typed word:", currentInput);
    console.log("Answer word is:", answerWord);
  };

    return (
    <div className="wordle">
      <h1>Wordle</h1>
        <div className="inputs-container">
          {/* Validation: accepting input that has 5 letters only from the player */}
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
          <button onClick = {handleEvaluateClick}>EVALUATE</button>
      </div>

      {/* Game Grid */}
      <div className="grid">
        {Array(MAX_ATTEMPTS)
          .fill(null)
          .map((_, attemptIndex) => (
            <div key={attemptIndex} className="row">
              {Array(WORD_LENGTH)
                .fill(null)
                .map((letter, letterIndex) => (
                  <div key={letterIndex} className="cell">
                    {letter}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WordleGame;
