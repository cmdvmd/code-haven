import './App.css';
import Header from './Header';
import TestOption from "./TestOption";
import Problem from "./Problem"
import Toggle from "./Toggle";
import FrequencyTable from "./FrequencyTable";
import {useState} from "react";

function App() {
    const [cipherType, setCipherType] = useState("Aristocrat");
    const [alphabet, setAlphabet] = useState("Random");
    const [autocheck, setAutocheck] = useState(false);

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
                </div>
                <Problem cipher={cipherType} alphabet={alphabet} autocheck={autocheck}/>
            </div>
        </div>
    );
}

export default App;
