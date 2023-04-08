import './App.css';
import Header from './Header';
import TestOption from "./TestOption";
import Problem from "./Problem"
import Toggle from "./Toggle";
import ResetButton from "./ResetButton";
import HintButton from "./HintButton";
import Footer from "./Footer";
import {useState, useEffect} from "react";

function App() {
    const [cipher, setCipher] = useState(localStorage.getItem("cipher") || "Aristocrat");
    const [alphabet, setAlphabet] = useState(localStorage.getItem("alphabet") || "Random");
    const [autocheck, setAutocheck] = useState(JSON.parse(localStorage.getItem("autocheck")) || false);
    const [plaintextWords, setPlaintextWords] = useState(null);
    const [ciphertextWords, setCiphertextWords] = useState(null);
    const [selected, setSelected] = useState(null);
    const [inputtedText, setInputtedText] = useState(null);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        localStorage.setItem("cipher", cipher)
    }, [cipher]);
    useEffect(() => {
        localStorage.setItem("alphabet", alphabet)
    }, [alphabet]);
    useEffect(() => {
        localStorage.setItem("autocheck", String(autocheck))
    }, [autocheck]);

    return (
        <div className="App">
            <Header/>
            <div className="content">
                <div className="test-options-wrapper">
                    <TestOption handleChange={setCipher} current={cipher} name="Cipher"
                                options={["Aristocrat", "Patristocrat", "Xenocrypt"]}/>
                    <TestOption handleChange={setAlphabet} name="Alphabet" current={alphabet}
                                options={["Random", "K1", "K2", "K3"]}/>
                    <Toggle handleChange={setAutocheck} name="Autocheck" current={autocheck}/>
                    <div className="option-buttons-wrapper">
                        <HintButton cipher={cipher} plaintextWords={plaintextWords} inputtedText={inputtedText}
                                    updateInputtedText={setInputtedText}/>
                        <ResetButton inputtedText={inputtedText} updateInputtedText={setInputtedText}
                                     updateSelected={setSelected} toggleReset={setReset}/>
                    </div>
                </div>
                <Problem cipher={cipher} alphabet={alphabet} autocheck={autocheck} plaintextWords={plaintextWords}
                         updatePlaintextWords={setPlaintextWords} ciphertextWords={ciphertextWords}
                         updateCiphertextWords={setCiphertextWords} inputtedText={inputtedText}
                         handleInput={setInputtedText} selected={selected} handleSelection={setSelected} reset={reset}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
