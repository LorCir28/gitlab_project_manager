const InputLabel = (props) => {
    return(
        <div>
            <input type={"text"} placeholder={"name of label"} id={props.id}></input>
            <input type={"text"} placeholder={"colour of label"} id={props.id+100}></input>
        </div>
    )
}

export default InputLabel;