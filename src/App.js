import './App.css';
import Header from './Header';
import TestType from "./TestType";
import Cipher from "./Cipher"
import Toggle from "./Toggle";
import {useState} from "react";

function App() {
    const [cipherType, setCipherType] = useState("Aristocrat");
    const [alphabet, setAlphabet] = useState("Random");
    const [autocheck, setAutocheck] = useState(false);

    return (
        <div className="App">
            <Header/>
            <div className="content">
                <TestType handleChange={setCipherType} current={cipherType} name="Cipher"
                          options={["Aristocrat", "Patristocrat"]}/>
                <TestType handleChange={setAlphabet} name="Alphabet" current={alphabet}
                          options={["Random", "K1", "K2", "K3"]}/>
                <Toggle handleChange={setAutocheck} name="Autocheck" current={autocheck}/>
                <Cipher cipher={cipherType} alphabet={alphabet} autocheck={autocheck}/>
            </div>
        </div>
    );
}

export default App;
