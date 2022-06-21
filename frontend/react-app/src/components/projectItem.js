import "./css/projectItem.css"

const ProjectItem = ({item}) => {
    return(
        <div id="div">
            <h5>{item.name}</h5>
        </div>
    )
}

export default ProjectItem;