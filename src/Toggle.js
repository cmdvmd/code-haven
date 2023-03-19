const Toggle = ({handleChange, name, current}) => (
    <div className="characteristic-wrapper">
        <label className="characteristic-name" htmlFor="checkbox">{name}:</label>
        <input className="characteristic-checkbox" type="checkbox" name="checkbox" checked={current}
               onChange={() => handleChange((prevState) => !prevState)}/>
    </div>
);

export default Toggle;
