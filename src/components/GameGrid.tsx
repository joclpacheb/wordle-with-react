const GameGrid = ({ gridData }) => {
    return (
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
    );
};

export default GameGrid;
