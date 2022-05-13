import "./projectItem.css"

const ProjectItem = ({item}) => {
    return(
        <div id="div">
            <h2>{item.name}</h2>
        </div>
    )
}

export default ProjectItem;