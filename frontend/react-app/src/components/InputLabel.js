const InputLabel = (props) => {
    return(
        <div>
            <input type={"text"} placeholder={"name of label"} id={props.id}></input>
            {/* <input type={"text"} placeholder={"colour of label"} id={props.id+100}></input> */}
            colour of label<select id={props.id+100}>
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