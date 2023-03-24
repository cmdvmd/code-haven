import './App.css';
import Header from './Header';
import TestOption from "./TestOption";
import Problem from "./Problem"
import Toggle from "./Toggle";
import Footer from "./Footer";
import {useState, useEffect} from "react";

function App() {
    const [cipher, setCipher] = useState(localStorage.getItem("cipher") || "Aristocrat");
    const [alphabet, setAlphabet] = useState(localStorage.getItem("alphabet") || "Random");
    const [autocheck, setAutocheck] = useState(JSON.parse(localStorage.getItem("autocheck")) || false);
    const [selected, setSelected] = useState(null);
    const [inputtedText, setInputtedText] = useState(null);
    const [resetWordBreaks, setResetWordBreaks] = useState(false);

    const resetInputtedText = () => {
        if (inputtedText !== null) {
            setInputtedText((originalValue) => originalValue.map((word) => Array(word.length).fill("\u00A0")));
            setSelected([0, 0]);
            setResetWordBreaks((prevState) => !prevState);
        }
    }

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
                                options={["Aristocrat", "Patristocrat"]}/>
                    <TestOption handleChange={setAlphabet} name="Alphabet" current={alphabet}
                                options={["Random", "K1", "K2", "K3"]}/>
                    <Toggle handleChange={setAutocheck} name="Autocheck" current={autocheck}/>
                    <button className="reset-button" onClick={resetInputtedText}>Reset</button>
                </div>
                <Problem cipher={cipher} alphabet={alphabet} autocheck={autocheck} inputtedText={inputtedText}
                         handleInput={setInputtedText} selected={selected} handleSelection={setSelected}
                         resetWordBreaks={resetWordBreaks}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
