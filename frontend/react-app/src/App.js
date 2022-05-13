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
      <br />
      <br />
      <h1>Projects</h1>
      <br />
      {projects && projects.map((project) => (
        <ProjectItem item={project} key={project.id}/>
      ))}
      <br />
      <br />
      <button onClick={() => setButtonPopup(true)}>open popup</button>
      <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <input type={"text"} placeholder={"name of project"} id={"nameProject"}></input>
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
        }}>
          create project
        </button>
      </Popup>
    </>
  );
}

export default App;



          