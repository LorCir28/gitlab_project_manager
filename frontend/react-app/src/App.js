// modal (popup)

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
          <button id="newproject-btn" onClick={() => {
            setButtonPopup(true);
            const background = document.getElementById("general-container");
            background.style.filter = "blur(8px)";
          }}>New project</button>
        </div>
      </div>
          <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
            <input type={"text"} placeholder={"name of project"} id={"nameProject"}></input>
            {/* <br />
            <br />
            <button type="button" class="btn btn-secondary" onClick={() => {
              axios.post(`http://localhost:8000/add-label`);
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
              const colourLabel = document.getElementById("colourLabel").value;
              axios.post(`http://localhost:8000/new_project`, {
                nameProject: nameProject,
                nameLabel: nameLabel,
                colourLabel: colourLabel
               });
              setButtonPopup(false);
              window.location.reload();
            }}>
              create project
            </button>
          </Popup>
    </>
  );
}

export default App;



          