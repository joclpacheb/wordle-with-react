
interface InputContainerProps {
    currentInput: string; // The current input value (string)
    setCurrentInput: (input: string) => void; // Function to update the input value
    handleEvaluateClick: () => void; // Function to handle evaluating the input
    WORD_LENGTH: number; // The length of the word (number)
}

const InputContainer: React.FC<InputContainerProps> = ({
    currentInput,
    setCurrentInput,
    handleEvaluateClick,
    WORD_LENGTH,
}) => {
    return (
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

                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleEvaluateClick();
                    }
                }}
            />
            <button onClick={handleEvaluateClick}>EVALUATE</button>
        </div>
    );
};

export default InputContainer;
