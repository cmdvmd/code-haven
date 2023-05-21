const HintButton = ({cipher, plaintextWords, inputtedText, updateInputtedText}) => {
    const hint_order = "AEIOUTNSRHLDCMFPGWYBVKXJQZ";
    const spanish_hint_order = "AEIOUSNRLDTCMPBHQYVGFJZ\u00d1XKW";

    const giveHint = () => {
        let order = (cipher === "Xenocrypt") ? spanish_hint_order : hint_order;
        let newAnswer = [...inputtedText];
        for (let index = 0; index < order.length; index++) {
            let worked = false;
            let hint = order.charAt(index);
            plaintextWords.forEach((word, wordIndex) => {
                for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
                    if (word.charAt(letterIndex) === hint && newAnswer[wordIndex][letterIndex] !== hint) {
                        newAnswer[wordIndex][letterIndex] = hint;
                        worked = true;
                    }
                }
            });
            if (worked) break;
        }
        updateInputtedText(newAnswer);
    }

    return <button className="option-button" onClick={giveHint}>Hint</button>;
}

export default HintButton;