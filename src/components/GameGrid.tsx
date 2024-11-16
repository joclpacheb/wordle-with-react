// Define the type for a single cell
interface Cell {
    letter: string; // The letter to display
    status: string; // The status for styling (e.g., "correct", "incorrect")
}

// Define the type for the grid data
type GridData = Cell[][]; // A 2D array of cells

// Define the props for the GameGrid component
interface GameGridProps {
    gridData: GridData; // The grid data prop
}

// Defines the GameGrid component
const GameGrid: React.FC<GameGridProps> = ({ gridData }) => {
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
