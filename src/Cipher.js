import Letter from "./Letter";
import {useState, useEffect} from "react";

function Cipher({cipher, alphabet, autocheck}) {
    const [ciphertextWords, setCiphertext] = useState([]);
    const [plaintextWords, setPlaintext] = useState([]);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState([0, 0]);

    useEffect(() => {
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
        <div className="cipher-wrapper">
            {error && <p className="error">The requested data could not be retrieved at this time.</p>}
            {!error && ciphertextWords.map((word, wordIndex) => (
                <div key={wordIndex} className="word-wrapper">
                    {[...word].map((char, charIndex) => (
                        <Letter key={[wordIndex, charIndex]} handleFocus={setSelected} location={[wordIndex, charIndex]}
                                ciphertext={char} plaintext={plaintextWords[wordIndex][charIndex]}
                                similar={char === ciphertextWords[selected[0]][selected[1]]}
                                active={wordIndex === selected[0] && charIndex === selected[1]} autocheck={autocheck}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Cipher;
