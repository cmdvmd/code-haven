function TableLetter({alphabetLetter, ciphertextLetter, inputtedLetter, frequency, k2, active, autocheck}) {
    const blank = "\u00A0";
    return (
        <div
            className={"frequency-table-letter-wrapper" + (active ? " active" : "") + ((autocheck && inputtedLetter !== blank && inputtedLetter !== ciphertextLetter) ? " incorrect" : "")}>
            <p className={"frequency-table-letter" + (!k2 ? " alphabet" : "")}>{k2 ? inputtedLetter : alphabetLetter}</p>
            <p className={"frequency-table-letter" + (k2 ? " alphabet" : "")}>{k2 ? alphabetLetter : (frequency === 0 ? blank : frequency)}</p>
            <p className="frequency-table-letter">{k2 ? (frequency === 0 ? blank : frequency) : inputtedLetter}</p>
        </div>
    );
}

export default TableLetter;
