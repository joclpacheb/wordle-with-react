import "./styles.scss";
import InputContainer from "./components/InputContainer";
import GameGrid from "./components/GameGrid";
import GameStatusMessage from "./components/GameStatusMessage";
import useWordleGame from "./hooks/useWordleGame";

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
    // */

const WordleGame: React.FC = () => {
  // Custom hook that contains the game logic and state
  const {
    currentInput,
    setCurrentInput,
    gridData,
    gameOver,
    gameWon,
    answerWord,
    evaluateInput,
    resetGame,
  } = useWordleGame();

  // Rendering the game component
  return (
    <div className="wordle">
      <h1>Wordle</h1>

      {/* Game Grid */}
      {gameOver === false && gameWon === false && (
        <div className="grid-wrapper">
          <InputContainer
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            handleEvaluateClick={evaluateInput}
            WORD_LENGTH={5}
          />
          <GameGrid gridData={gridData} />
        </div>
      )}

      {/* Game Won/Game Over messages */}
      <GameStatusMessage
        gameOver={gameOver}
        gameWon={gameWon}
        answerWord={answerWord}
        resetGame={resetGame}
      />
    </div>
  );
};
export default WordleGame;
