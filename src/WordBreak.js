import {useEffect, useState} from "react";

const WordBreak = ({reset}) => {
    const [display, setDisplay] = useState(false);
    useEffect(() => {setDisplay(false)}, [reset])
    return <div className={"word-break" + (display ? " active" : "")}
                onClick={() => setDisplay((prevState) => !prevState)}/>;
}

export default WordBreak;
