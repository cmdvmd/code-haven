import {useEffect, useState} from "react";

function TableLetter({alphabetLetter, ciphertextLetter, frequency, k2, selectedLetter, active, autocheck}) {
    const blank = "\u00A0";
    const [inputtedLetter, setInputtedLetter] = useState(blank);

    useEffect(() => setInputtedLetter(blank), [alphabetLetter, ciphertextLetter, frequency]);

    useEffect(() => {
        const handleKeypress = (event) => {
            let validKey = /^[A-Za-z]$/.test(event.key);
            if (!k2 && active) {
                if (validKey) {
                    setInputtedLetter(event.key.toUpperCase());
                } else if (event.key === "Backspace") {
                    setInputtedLetter(blank);
                }
            } else if (k2) {
                if (event.key.toUpperCase() === alphabetLetter) {
                    setInputtedLetter(selectedLetter);
                } else if (inputtedLetter === selectedLetter && ((event.key === "Backspace") || (validKey && event.key.toUpperCase() !== alphabetLetter))) {
                    setInputtedLetter(blank);
                }
            }
        }

        window.addEventListener('keyup', handleKeypress, true);
        return () => window.removeEventListener('keyup', handleKeypress, true);
    }, [active, selectedLetter, alphabetLetter, inputtedLetter, k2]);

    return (
        <div
            className={"frequency-table-letter-wrapper" + (active ? " active" : "") + ((autocheck && inputtedLetter !== blank && inputtedLetter !== ciphertextLetter) ? " incorrect" : "")}>
            <p className={"frequency-table-letter" + (!k2 ? " alphabet" : "")}>{k2 ? inputtedLetter : alphabetLetter}</p>
            <p className={"frequency-table-letter" + (k2 ? " alphabet" : "")}>{k2 ? alphabetLetter : (frequency === 0 ? blank : frequency)}</p>
            <p className="frequency-table-letter">{k2 ? (frequency === 0 ? blank : frequency) : inputtedLetter}</p>
        </div>
    )
}

export default TableLetter;
