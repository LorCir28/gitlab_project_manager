import "./card.css"

const Card = (props) => {
    return (
        <div className="col" id="card_container">
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">projects</h5>
                    <p className="card-text">You can do the following actions</p>
                    <button className="btn btn-info" id="btn-listprojects" onClick={() => {
                        props.setButtonPopupListProjects(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>list projects</button>
                    <button className="btn btn-success" id="btn-createproject" onClick={() => {
                        props.setButtonPopupCreateProject(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>create new project</button>
                    <button className="btn btn-danger" id="btn-deleteproject" onClick={() => {
                        props.setButtonPopupDeleteProject(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>delete project</button>
                </div>
            </div>
        </div>
    )
}

export default Card;