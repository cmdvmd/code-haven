import {useEffect} from "react";

function TestType({handleChange, name, current, options}) {
    useEffect(() => {
        if (current == null) {
            handleChange(options[0]);
        }
    });
    return (
        <div className="characteristic-wrapper">
            <p className="characteristic-name">{name}:</p>
            <div className="characteristic-option-wrapper">
                {options.map((option) => (
                    <button key={option} className={"characteristic-option" + ((option === current) ? " active" : "")}
                            onClick={() => handleChange(option)}>{option}</button>))}
            </div>
        </div>
    )
}

export default TestType;
