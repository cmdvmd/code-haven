import './App.css';
import Header from './Header';
import TestOption from "./TestOption";
import Problem from "./Problem"
import Toggle from "./Toggle";
import {useState} from "react";

function App() {
    const [cipherType, setCipherType] = useState("Aristocrat");
    const [alphabet, setAlphabet] = useState("Random");
    const [autocheck, setAutocheck] = useState(false);
    const [selected, setSelected] = useState(null);
    const [inputtedText, setInputtedText] = useState(null);

    const resetInputtedText = () => {
        if (inputtedText !== null) {
            setInputtedText((originalValue) => originalValue.map((word) => Array(word.length).fill("\u00A0")));
            setSelected([0, 0]);
        }
    }

    return (
        <div className="App">
            <Header/>
            <div className="content">
                <div className="test-options-wrapper">
                    <TestOption handleChange={setCipherType} current={cipherType} name="Cipher"
                                options={["Aristocrat", "Patristocrat"]}/>
                    <TestOption handleChange={setAlphabet} name="Alphabet" current={alphabet}
                                options={["Random", "K1", "K2", "K3"]}/>
                    <Toggle handleChange={setAutocheck} name="Autocheck" current={autocheck}/>
                    <button className="reset-button" onClick={resetInputtedText}>Reset</button>
                </div>
                <Problem cipher={cipherType} alphabet={alphabet} autocheck={autocheck} inputtedText={inputtedText}
                         handleInput={setInputtedText} selected={selected} handleSelection={setSelected}/>
            </div>
        </div>
    );
}

export default App;
