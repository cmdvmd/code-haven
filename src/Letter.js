import {useEffect, useState} from "react";

function Letter({ciphertext, plaintext, similar, active, autocheck}) {
    const blank = '\u00A0';
    const [inputtedLetter, setInputtedLetter] = useState(blank);

    useEffect(() => {
        const handleKeypress = (event) => {
            if (similar && /^[A-Za-z]$/.test(event.key)) {
                setInputtedLetter(event.key.toUpperCase())
            } else if (similar && event.key === "Backspace") {
                setInputtedLetter(blank);
            }
        }

        document.addEventListener('keyup', handleKeypress, true);
        return () => document.removeEventListener('keyup', handleKeypress, true);
    }, [similar]);

    return (
        <div
            className={"letter-wrapper" + ((autocheck && inputtedLetter !== blank && inputtedLetter !== plaintext) ? " incorrect" : "")}>
            <p className="ciphertext-letter">{ciphertext}</p>
            <p className={"plaintext-letter" + ((similar) ? " similar" : "") + ((active) ? " active" : "")}>{inputtedLetter}</p>
        </div>
    )
}

export default Letter;
