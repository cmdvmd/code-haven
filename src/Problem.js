import CipherLetter from "./CipherLetter";
import {useState, useEffect} from "react";
import FrequencyTable from "./FrequencyTable";

function Problem({cipher, alphabet, autocheck}) {
    const [ciphertextWords, setCiphertext] = useState(null);
    const [plaintextWords, setPlaintext] = useState(null);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(null);
    const [inputtedText, setInputtedText] = useState(null);
    const blank = "\u00A0";

    const complete = (correct, inputtedAnswer = inputtedText) => {
        for (let wordIndex = 0; wordIndex < inputtedAnswer.length; wordIndex++) {
            for (let letterIndex = 0; letterIndex < inputtedAnswer[wordIndex].length; letterIndex++) {
                if (/[A-Z]/.test(ciphertextWords[wordIndex][letterIndex]) && ((correct && inputtedAnswer[wordIndex][letterIndex] !== ciphertextWords[wordIndex][letterIndex]) || (!correct && inputtedAnswer[wordIndex][letterIndex] === blank))) {
                    return false;
                }
            }
        }
        return true;
    }

    const handleInput = (char, location) => {
        let newAnswer = inputtedText.map((word, wordIndex) => word.map((letter, letterIndex) => (ciphertextWords[wordIndex][letterIndex] === ciphertextWords[location[0]][location[1]]) ? char : inputtedText[wordIndex][letterIndex]));
        let [wordIndex, letterIndex] = [...selected];
        if (char !== blank && !complete(false, newAnswer)) {
            do {
                if (letterIndex === ciphertextWords[wordIndex].length - 1) {
                    wordIndex = (wordIndex + 1) % ciphertextWords.length;
                    letterIndex = 0;
                }
                else {
                    letterIndex++;
                }
            } while(newAnswer[wordIndex][letterIndex] !== blank || !/[A-Z]/.test(ciphertextWords[wordIndex][letterIndex]));
        }
        setInputtedText(newAnswer);
        setSelected([wordIndex, letterIndex]);
    }

    useEffect(() => {
        fetch(`https://codebustersapi.pythonanywhere.com/${cipher.toLowerCase()}?alphabet=${alphabet}`)
            .then((response) => response.json())
            .then((problem) => {
                let words = problem.ciphertext.split(" ");
                setCiphertext(words);
                setPlaintext(problem.plaintext.split(" "));
                setInputtedText(words.map((word) => Array(word.length).fill(blank)));
                setSelected([0, 0]);
                setError(false);
            })
            .catch(() => {
                setError(true);
            })
    }, [cipher, alphabet]);

    return (
        <div className="problem-wrapper">
            <div className="cipher-wrapper">
                {error && <p className="error">The requested data could not be retrieved at this time.</p>}
                {ciphertextWords && ciphertextWords.map((word, wordIndex) => (
                    <div key={wordIndex} className="word-wrapper">
                        {[...word].map((char, charIndex) => (
                            <CipherLetter key={[wordIndex, charIndex]} handleFocus={setSelected}
                                          handleText={handleInput}
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
            {ciphertextWords && <FrequencyTable ciphertext={ciphertextWords.join()} plaintext={plaintextWords.join()}
                                                alphabet={alphabet} selected={ciphertextWords[selected[0]][selected[1]]}
                                                autocheck={autocheck}/>}
        </div>
    )
}

export default Problem;
