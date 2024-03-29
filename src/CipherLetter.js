import WordBreak from "./WordBreak";
import {useState, useEffect} from "react";

function CipherLetter({
                          handleFocus,
                          handleText,
                          location,
                          cipher,
                          ciphertext,
                          plaintext,
                          displayText,
                          similar,
                          active,
                          autocheck,
                          reset
                      }) {
    const [selected, setSelected] = useState(false);
    const blank = "\u00A0";

    const handleClick = () => {
        setSelected((prevState) => !prevState);
    }

    useEffect(() => {
        const handleKeypress = (event) => {
            if (similar && /^[A-Za-z]$/.test(event.key)) {
                handleText(event.key.toUpperCase(), location)
            } else if (similar && (event.key === "`" || event.key === "~")) {
                handleText("\u00d1", location);
            } else if (similar && event.key === "Backspace") {
                handleText(blank, location)
            }
        }

        document.addEventListener('keyup', handleKeypress, true);
        return () => document.removeEventListener('keyup', handleKeypress, true);
    }, [similar, handleText, location]);

    return (
        <div className={"cipher-letter-wrapper" + ((cipher === "Patristocrat") ? " patristocrat-letter" : "")}>
            <div
                className={"letter-wrapper" + ((autocheck && displayText !== blank && displayText !== plaintext) ? " incorrect" : "")}
                onClick={() => /^[A-Z\u00d1]$/.test(plaintext) && handleFocus(location)}>
                <p className={"ciphertext-letter" + (selected ? " selected" : "")}
                   onClick={handleClick}>{ciphertext}</p>
                {/^[A-Z\u00d1]$/.test(plaintext) &&
                    <p className={"plaintext-letter" + ((similar) ? " similar" : "") + ((active) ? " active" : "")}>{displayText}</p>}
                {!/^[A-Z\u00d1]$/.test(plaintext) && <p className="plaintext-letter non-alphabetic">{plaintext}</p>}
            </div>
            {cipher === "Patristocrat" && <WordBreak reset={reset}/>}
        </div>
    );
}

export default CipherLetter;
