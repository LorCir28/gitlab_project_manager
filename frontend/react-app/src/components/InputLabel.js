import "./inputLabel.css"

const InputLabel = (props) => {
    return(
        <div id="inputlabel-container">
            <input type={"text"} placeholder={"name of label"} id={props.id} className="labelname"></input>
            colour of label<select id={props.id+100} className="labelcolour">
            <option>white</option>
            <option>red</option>
            <option>yellow</option>
            <option>grey</option>
            <option>black</option>
            <option>green</option>
            <option>violet</option>
            <option>orange</option>
            <option>brown</option>
        </select>
        </div>
    )
}

export default InputLabel;