import './App.css';
import Header from './Header';
import TestType from "./TestType";
import Cipher from "./Cipher"
import {useState} from "react";

function App() {
    const [cipherType, setCipherType] = useState("Aristocrat");
    const [alphabet, setAlphabet] = useState("Random");

    return (
        <div className="App">
            <Header/>
            <div className="content">
                <TestType handleChange={setCipherType} current={cipherType} name="Cipher"
                          options={["Aristocrat", "Patristocrat"]}/>
                <TestType handleChange={setAlphabet} current={alphabet} name="Alphabet"
                          options={["Random", "K1", "K2", "K3"]}/>
                <Cipher cipher={cipherType} alphabet={alphabet}/>
            </div>
        </div>
    );
}

export default App;
