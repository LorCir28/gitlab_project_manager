import "./css/card.css"

const Card = (props) => {
    return (
        <div className="col" id="card_container">
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title" id="cardtitle">{props.item}</h5>
                    <p className="card-text">You can do the following actions</p>
                    <button className="btn btn-info" id="btn-listprojects" onClick={() => {
                        props.setButtonPopupList(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>list {props.item}</button>
                    <button className="btn btn-success" id="btn-createproject" onClick={() => {
                        props.setButtonPopupCreate(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>create new {props.item}</button>
                    <button className="btn btn-danger" id="btn-deleteproject" onClick={() => {
                        props.setButtonPopupDelete(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>delete {props.item}</button>
                </div>
            </div>
        </div>
    )
}

export default Card;