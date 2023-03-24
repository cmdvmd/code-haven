import WordBreak from "./WordBreak";
import {useEffect} from "react";

function CipherLetter({
                          handleFocus,
                          handleText,
                          location,
                          ciphertext,
                          plaintext,
                          displayText,
                          similar,
                          active,
                          autocheck,
                          resetWordBreaks
                      }) {
    const blank = "\u00A0";

    useEffect(() => {
        const handleKeypress = (event) => {
            if (similar && /^[A-Za-z]$/.test(event.key)) {
                handleText(event.key.toUpperCase(), location)
            } else if (similar && event.key === "Backspace") {
                handleText(blank, location)
            }
        }

        document.addEventListener('keyup', handleKeypress, true);
        return () => document.removeEventListener('keyup', handleKeypress, true);
    }, [similar, handleText, location]);

    return (
        <div className="cipher-letter-wrapper">
            <div
                className={"letter-wrapper" + ((autocheck && displayText !== blank && displayText !== plaintext) ? " incorrect" : "")}
                onClick={() => /^[A-Z]$/.test(plaintext) && handleFocus(location)}>
                <p className="ciphertext-letter">{ciphertext}</p>
                {/^[A-Z]$/.test(plaintext) &&
                    <p className={"plaintext-letter" + ((similar) ? " similar" : "") + ((active) ? " active" : "")}>{displayText}</p>}
                {!/^[A-Z]$/.test(plaintext) && <p className="plaintext-letter non-alphabetic">{plaintext}</p>}
            </div>
            <WordBreak reset={resetWordBreaks}/>
        </div>
    );
}

export default CipherLetter;
