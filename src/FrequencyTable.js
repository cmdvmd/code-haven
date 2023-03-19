import TableLetter from "./TableLetter"

function FrequencyTable({ciphertext, plaintext, inputtedText, alphabet, selected, autocheck}) {
    const english_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const k2 = alphabet === "K2";

    const calculateFrequency = (letter) => {
        let frequency = 0;
        for (const char of ciphertext) if (char === letter) frequency++;
        return frequency;
    }

    const findPair = (char) => {
        let index = (k2 ? plaintext : ciphertext).indexOf(char);
        return (index === -1) ? "\u00A0" : (k2 ? ciphertext : plaintext).charAt(index);
    }

    const findInput = (char) => {
        let index = ciphertext.indexOf(char);
        let current = 0;
        for (let wordIndex = 0; wordIndex < inputtedText.length; wordIndex++) {
            for (let letterIndex = 0; letterIndex < inputtedText[wordIndex].length; letterIndex++) {
                if (!k2 && current === index) {
                    return inputtedText[wordIndex][letterIndex];
                }
                else if (k2 && inputtedText[wordIndex][letterIndex] === char) {
                    return ciphertext.charAt(current);
                }
                current++;
            }
            current++;
        }
        return "\u00A0";
    }

    return (
        <div className="frequency-table-wrapper">
            {[...english_alphabet].map((char, index) => (
                <TableLetter key={index} alphabetLetter={char} ciphertextLetter={findPair(char)}
                             inputtedLetter={findInput(char)} frequency={calculateFrequency(char)} k2={k2}
                             selectedLetter={selected} active={char === selected} autocheck={autocheck}/>
            ))}
        </div>
    );
}

export default FrequencyTable;
