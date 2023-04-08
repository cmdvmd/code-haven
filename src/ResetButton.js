const ResetButton = ({inputtedText, updateInputtedText, updateSelected, toggleReset}) => {
    const reset = () => {
        if (inputtedText !== null) {
            updateInputtedText((originalValue) => originalValue.map((word) => Array(word.length).fill("\u00A0")));
            updateSelected([0, 0]);
            toggleReset((prevState) => !prevState);
        }
    }

    return <button className="option-button" onClick={reset}>Reset</button>;
}

export default ResetButton;
