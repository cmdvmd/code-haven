import TableLetter from "./TableLetter"

function FrequencyTable({ciphertext, plaintext, alphabet, selected, autocheck}) {
    const english_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const calculateFrequency = (letter) => {
        let frequency = 0;
        for (const char of ciphertext) if (char === letter) frequency++;
        return frequency;
    }

    const findPair = (ciphertextLetter) => {
        let index = ciphertext.indexOf(ciphertextLetter);
        return (index === -1) ? "\u00A0" : plaintext.charAt(index);
    }

    return (
        <div className="frequency-table-wrapper">
            {[...english_alphabet].map((char, index) => (
                <TableLetter key={index} alphabetLetter={char} ciphertextLetter={findPair(char)}
                             frequency={calculateFrequency(char)} k2={alphabet === "K2"} active={char === selected}
                             autocheck={autocheck}/>
            ))}
        </div>
    )
}

export default FrequencyTable;