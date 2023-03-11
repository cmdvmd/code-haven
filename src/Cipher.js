import {useState, useEffect} from "react";

function Cipher({cipher, alphabet, autocheck}) {
    const [ciphertext, setCiphertext] = useState(null);
    const [plaintext, setPlaintext] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://codebustersapi.pythonanywhere.com/${cipher.toLowerCase()}?alphabet=${alphabet}`)
            .then((response) => response.json())
            .then((problem) => {
                setCiphertext(problem.ciphertext);
                setPlaintext(problem.plaintext);
                setError(false);
            })
            .catch((err) => {
                setError(true);
            })
    }, [cipher, alphabet]);

    return (
        <div className="cipher-wrapper">
            {error && <p className="error">The requested data could not be retrieved at this time.</p>}
        </div>
    )
}

export default Cipher;
