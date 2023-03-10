import './App.css';
import Header from './Header';
import TestType from "./TestType";
import {useState} from "react";

function App() {
    const [cipherType, setCipherType] = useState(null);
    const [alphabet, setAlphabet] = useState(null);

    return (
        <div className="App">
            <Header/>
            <div id="content">
                <TestType handleChange={setCipherType} current={cipherType} name="Cipher"
                          options={["Aristocrat", "Patristocrat"]}/>
                <TestType handleChange={setAlphabet} current={alphabet} name="Alphabet"
                          options={["Random", "K1", "K2"]}/>
            </div>
        </div>
    );
}

export default App;
