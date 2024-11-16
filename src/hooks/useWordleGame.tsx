import { useState, useEffect } from "react";
import { MAX_ATTEMPTS, WORD_LENGTH, ANSWER_WORD_BANK } from "../constants/ConfigValues";

//Custom Hook to manage the Wordle game logic
const useWordleGame = () => {
    const [currentInput, setCurrentInput] = useState("");
    const [gridData, setGridData] = useState(
        Array.from({ length: MAX_ATTEMPTS }, () =>
            Array.from({ length: WORD_LENGTH }, () => ({ letter: "", status: "" }))
        )
    );
    const [answerWord, setAnswerWord] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [activeRow, setActiveRow] = useState(0);

    // Helper function to pick a random word from the word bank
    const pickRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * ANSWER_WORD_BANK.length);
        return ANSWER_WORD_BANK[randomIndex];
    };

    // Initializing the answer word
    useEffect(() => {
        const word = pickRandomWord();
        setAnswerWord(word);
    }, []);

    // Function to evaluate the player's input
    const evaluateInput = () => {
        // Avoid direct mutation
        const newGridData = [...gridData];

        // Validation: Ensures if the typed input is a valid word length
        if (currentInput.length !== WORD_LENGTH) {
            alert(`Please enter a full ${WORD_LENGTH}-letter word.`);
            return;
        }

        // For debugging: Logs the player's input and the chosen answer
        console.log("Evaluating the user-typed word:", currentInput);
        console.log("Answer word is:", answerWord);

        // FIRST PASS: Mark correct letters (green) and track used letters in answer
        const answerWordCopy = answerWord.split("");
        let wordGuessedCorrectly = true;

        for (let i = 0; i < WORD_LENGTH; i++) {
            const char = currentInput[i];
            const isCorrect = char === answerWord[i];

            newGridData[activeRow][i] = {
                letter: char,
                status: isCorrect ? "correct" : "incorrect", // Correct => green, Incorrect => gray
            };

            if (!isCorrect) wordGuessedCorrectly = false; // Mark flag as false if not correct

            if (isCorrect) {
                answerWordCopy[i] = ""; // Mark letter as used
            }
        }

        // SECOND PASS: Mark imprecise (yellow) letters (right letter, wrong position)
        for (let i = 0; i < WORD_LENGTH; i++) {
            const char = currentInput[i];
            if (newGridData[activeRow][i].status === "incorrect") {
                // Check if the letter exists in the word but is in the wrong position
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
        setGridData(newGridData);

        // GAME WON: Checks if the word was guessed correctly
        if (wordGuessedCorrectly) {
            setGameWon(true);
            console.log("Game won.");
            return; // Skip further evaluation to prevent triggering the game over condition
        }

        // GAME OVER: Checks if the game is over
        if (activeRow + 1 >= MAX_ATTEMPTS) {
            setGameOver(true);
            console.log("Game Over.");
            return; // Skip row increment if game is over
        }

        // Moves to the next row
        setActiveRow((prevRow) => prevRow + 1);
        console.log("Current row is:", activeRow);

        // Resets input box after evaluation
        setCurrentInput("");
    };

    // Function to reset the game
    const resetGame = () => {
        setGameOver(false);
        setGameWon(false);
        setActiveRow(0);
        setGridData(
            Array.from({ length: MAX_ATTEMPTS }, () =>
                Array.from({ length: WORD_LENGTH }, () => ({ letter: "", status: "" }))
            )
        );
        setCurrentInput("");
        setAnswerWord(pickRandomWord());
        console.log("Game has been reset.");
    };

    return {
        currentInput,
        setCurrentInput,
        gridData,
        gameOver,
        gameWon,
        answerWord,
        evaluateInput,
        resetGame,
    };
};

export default useWordleGame;
