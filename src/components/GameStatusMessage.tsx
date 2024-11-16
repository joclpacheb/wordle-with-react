
const GameStatusMessage = ({ gameOver, gameWon, answerWord, resetGame }) => {
    return (
        <>
            {gameWon && (
                <div className="game-won">
                    <h2>You Win!</h2>
                    <p>The correct word was: {answerWord}.</p>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
            {gameOver && (
                <div className="game-over">
                    <h2>Game Over</h2>
                    <p>The correct word was: {answerWord}.</p>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </>
    );
};

export default GameStatusMessage;
