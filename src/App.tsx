import React, { useState } from "react";
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

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const ANSWER_WORD_BANK = ["CLOUD", "DREAM", "SWEET", "FLOAT"];

// TODO: Implement GameState
interface GameState { }

const WordleGame: React.FC = () => {
  // TODO: Implement the Wordle component
  const [currentInput, setCurrentInput] = React.useState("");

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setCurrentInput(e.target.value);
  };

  return (
    <div className="wordle">
      <h1>Wordle</h1>
      <div className="inputs-container">
        <input className="input-box" onChange={onChangeHandler}></input>
        <button>EVALUATE</button>
      </div>

      {/* Game Grid */}
      <div className="grid">
        {Array(MAX_ATTEMPTS)
          .fill(null)
          .map((_, attemptIndex) => (
            <div key={attemptIndex} className="row">
              {Array(WORD_LENGTH)
                .fill(null)
                .map((_, letterIndex) => (
                  <div key={letterIndex} className="cell" />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WordleGame;
