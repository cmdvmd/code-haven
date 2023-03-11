import {useEffect} from "react";

function TestType({handleChange, current, name, options}) {
    useEffect(() => {
        if (current == null) {
            handleChange(options[0]);
        }
    });
    return (
        <div className="characteristic">
            <p className="characteristic-name"><b>{name}:</b></p>
            <div className="characteristic-option-wrapper">
                {options.map((option) => (
                    <button key={option} className={"characteristic-option" + ((option === current) ? " active" : "")}
                            onClick={() => handleChange(option)}>{option}</button>))}
            </div>
        </div>
    )
}

export default TestType;
