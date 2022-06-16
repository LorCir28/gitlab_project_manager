const Card = (props) => {
    return (
        <div className="col">
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">projects</h5>
                    <p className="card-text">Here you can manage your gitlab projects with a simple interface!!!</p>
                    <button className="btn btn-info" onClick={() => {
                        props.setButtonPopupListProjects(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>list projects</button>
                    <button className="btn btn-success" onClick={() => {
                        props.setButtonPopupCreateProject(true);
                        const background = document.getElementById("general-container");
                        background.style.filter = "blur(8px)";
                    }}>create new project</button>
                    <button className="btn btn-danger" onClick={() => {
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