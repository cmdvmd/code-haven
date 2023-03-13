import CipherLetter from "./CipherLetter";
import {useState, useEffect} from "react";
import FrequencyTable from "./FrequencyTable";

function Problem({cipher, alphabet, autocheck}) {
    const [ciphertextWords, setCiphertext] = useState(null);
    const [plaintextWords, setPlaintext] = useState(null);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected([0, 0]);
        fetch(`https://codebustersapi.pythonanywhere.com/${cipher.toLowerCase()}?alphabet=${alphabet}`)
            .then((response) => response.json())
            .then((problem) => {
                setCiphertext(problem.ciphertext.split(" "));
                setPlaintext(problem.plaintext.split(" "));
                setError(false);
            })
            .catch((err) => {
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
                                          location={[wordIndex, charIndex]}
                                          ciphertext={char} plaintext={plaintextWords[wordIndex][charIndex]}
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
