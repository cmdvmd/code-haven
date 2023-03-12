import {useEffect, useState} from "react";

function Letter({handleFocus, location, ciphertext, plaintext, similar, active, autocheck}) {
    const blank = '\u00A0';
    const [inputtedLetter, setInputtedLetter] = useState(blank);

    useEffect(() => setInputtedLetter(blank), [ciphertext, plaintext]);

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
        <div className={"letter-wrapper" + ((autocheck && inputtedLetter !== blank && inputtedLetter !== plaintext) ? " incorrect" : "")} onClick={() => /^[A-Z]$/.test(plaintext) && handleFocus(location)}>
            <p className="ciphertext-letter">{ciphertext}</p>
            {/^[A-Z]$/.test(plaintext) && <p className={"plaintext-letter" + ((similar) ? " similar" : "") + ((active) ? " active" : "")}>{inputtedLetter}</p>}
            {/^[0-9]$/.test(plaintext) && <p className="plaintext-letter numerical">{plaintext}</p>}
        </div>
    )
}

export default Letter;
