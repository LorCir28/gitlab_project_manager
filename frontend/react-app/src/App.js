import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "./components/navbar"
import Popup from "./components/popup"
import {useState, useEffect} from "react"
import axios from "axios"
import ProjectItem from "./components/projectItem";

function App() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/projects")
    .then(res => {return res.json()})
    .then(data => setProjects(data))
  }, [])


  return (
    <>
      <Navbar></Navbar>
      <div id="general-container">
        <div id="projects-container">
          <br />
          <h1 id="h1_projects"><b>PROJECTS:</b></h1>
          <br />
          {projects && projects.map((project) => (
            <ProjectItem item={project} key={project.id}/>
          ))}
          <br />
          <br />
          <button id="newproject-btn" onClick={() => setButtonPopup(true)}>New project</button>
        </div>
          <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
            <input type={"text"} placeholder={"name of project"} id={"nameProject"}></input>
            {/* <br />
            <br />
            <button type="button" class="btn btn-secondary" onClick={() => {
              var data = fs.readFileSync('./App.js').toString().split("\n");
              data.splice(116, 0, titolorecensione+testorecensione);
              var text = data.join("\n");
              fs.writeFileSync("../frontend/public/esami/economiaAvanzata.html", text);
            }}>Add label
            </button> */}
            <br />
            <br />
            <input type={"text"} placeholder={"name of label"} id={"nameLabel"}></input>
            <input type={"text"} placeholder={"colour of label"} id={"colourLabel"}></input>
            <br />
            <br />
            <button type="button" className="btn btn-success" onClick={() => {
              const nameProject = document.getElementById("nameProject").value;
              const nameLabel = document.getElementById("nameLabel").value;
              const colourProject = document.getElementById("colourLabel").value;
              axios.post(`http://localhost:8000/new_project/${nameProject}/${nameLabel}/${colourProject}`);
              setButtonPopup(false);
              window.location.reload();
            }}>
              create project
            </button>
          </Popup>
      </div>
    </>
  );
}

export default App;



          