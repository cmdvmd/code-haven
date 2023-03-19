import CipherLetter from "./CipherLetter";
import {useState, useEffect, useRef, useCallback} from "react";
import FrequencyTable from "./FrequencyTable";

function Problem({cipher, alphabet, autocheck, inputtedText, handleInput, selected, handleSelection}) {
    const [ciphertextWords, setCiphertext] = useState(null);
    const [plaintextWords, setPlaintext] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const startTime = useRef(null);
    const blank = "\u00A0";

    useEffect(() => {
        startTime.current = Date.now();
    }, [cipher, alphabet]);

    const complete = useCallback((correct, inputtedAnswer = inputtedText) => {
        for (let wordIndex = 0; wordIndex < inputtedAnswer.length; wordIndex++) {
            for (let letterIndex = 0; letterIndex < inputtedAnswer[wordIndex].length; letterIndex++) {
                if (/[A-Z]/.test(ciphertextWords[wordIndex][letterIndex]) && ((correct && inputtedAnswer[wordIndex][letterIndex] !== plaintextWords[wordIndex][letterIndex]) || (!correct && inputtedAnswer[wordIndex][letterIndex] === blank))) {
                    return false;
                }
            }
        }
        return true;
    }, [ciphertextWords, inputtedText, plaintextWords]);

    const handleLetter = (char, location) => {
        let newAnswer = inputtedText.map((word, wordIndex) => word.map((letter, letterIndex) => (ciphertextWords[wordIndex][letterIndex] === ciphertextWords[location[0]][location[1]]) ? char : inputtedText[wordIndex][letterIndex]));
        let [wordIndex, letterIndex] = [...selected];
        if (char !== blank && !complete(false, newAnswer)) {
            do {
                if (letterIndex === ciphertextWords[wordIndex].length - 1) {
                    wordIndex = (wordIndex + 1) % ciphertextWords.length;
                    letterIndex = 0;
                } else {
                    letterIndex++;
                }
            } while (newAnswer[wordIndex][letterIndex] !== blank || !/[A-Z]/.test(ciphertextWords[wordIndex][letterIndex]));
        }
        handleInput(newAnswer);
        handleSelection([wordIndex, letterIndex]);
    }

    useEffect(() => {
        setError(false);
        setLoading(true);
        fetch(`https://codebustersapi.pythonanywhere.com/${cipher.toLowerCase()}?alphabet=${alphabet}`)
            .then((response) => response.json())
            .then((problem) => {
                let words = problem.ciphertext.split(" ");
                setCiphertext(words);
                setPlaintext(problem.plaintext.split(" "));
                handleInput(words.map((word) => Array(word.length).fill(blank)));
                handleSelection([0, 0]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, [cipher, alphabet, handleInput, handleSelection]);

    useEffect(() => {
        const handleKeypress = (event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                let [wordIndex, letterIndex] = [...selected];
                do {
                    if (event.key === "ArrowRight") {
                        if (letterIndex === inputtedText[wordIndex].length - 1) {
                            wordIndex = (wordIndex + 1) % inputtedText.length;
                            letterIndex = 0;
                        } else {
                            letterIndex++;
                        }
                    } else if (event.key === "ArrowLeft") {
                        if (letterIndex === 0) {
                            wordIndex = (((wordIndex - 1) % inputtedText.length) + inputtedText.length) % inputtedText.length;
                            letterIndex = inputtedText[wordIndex].length - 1;
                        } else {
                            letterIndex--;
                        }
                    }
                } while (!/[A-Z]/.test(ciphertextWords[wordIndex][letterIndex]));
                handleSelection([wordIndex, letterIndex]);
            } else if (event.key === "Enter" && complete(true)) {
                console.log(Date.now() - startTime.current);
                let time = Math.round((Date.now() - startTime.current) / 1000);
                let minutes = Math.floor(time / 60);
                let seconds = (time % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
                alert(`Correct!\n\n${plaintextWords.join(" ")}\n\nYour Time: ${minutes}:${seconds}\n\nClose this prompt to practice a new problem`);
                document.location.reload();
            }
        }

        document.addEventListener('keyup', handleKeypress, true);
        return () => document.removeEventListener('keyup', handleKeypress, true);
    }, [selected, inputtedText, ciphertextWords, handleSelection, complete, plaintextWords]);

    return (
        <div className="problem-wrapper">
            <div className="cipher-wrapper">
                {loading && <p className="message">Loading...</p>}
                {error && <p className="message">The requested data could not be retrieved at this time.</p>}
                {!loading && !error && ciphertextWords.map((word, wordIndex) => (
                    <div key={wordIndex} className="word-wrapper">
                        {[...word].map((char, charIndex) => (
                            <CipherLetter key={[wordIndex, charIndex]} handleFocus={handleSelection}
                                          handleText={handleLetter}
                                          location={[wordIndex, charIndex]}
                                          ciphertext={char} plaintext={plaintextWords[wordIndex][charIndex]}
                                          displayText={inputtedText[wordIndex][charIndex]}
                                          similar={char === ciphertextWords[selected[0]][selected[1]]}
                                          active={wordIndex === selected[0] && charIndex === selected[1]}
                                          autocheck={autocheck}/>
                        ))}
                    </div>
                ))}
            </div>
            {!loading && !error && <FrequencyTable ciphertext={ciphertextWords.join()} plaintext={plaintextWords.join()}
                                                   inputtedText={inputtedText} alphabet={alphabet}
                                                   selected={ciphertextWords[selected[0]][selected[1]]}
                                                   autocheck={autocheck}/>}
        </div>
    );
}

export default Problem;
