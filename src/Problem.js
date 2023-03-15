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

    const handleInput = (char, location) => {
        setInputtedText((previousAnswer) => previousAnswer.map((word, wordIndex) => word.map((letter, letterIndex) => {
            return (ciphertextWords[wordIndex][letterIndex] === ciphertextWords[location[0]][location[1]]) ? char : previousAnswer[wordIndex][letterIndex];
        })));
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
