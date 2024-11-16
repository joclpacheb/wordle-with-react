const InputContainer = ({ currentInput, setCurrentInput, handleEvaluateClick, WORD_LENGTH }) => {
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
            />
            <button onClick={handleEvaluateClick}>EVALUATE</button>
        </div>
    );
};

export default InputContainer;
