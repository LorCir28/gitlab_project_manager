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
  // let Projects = axios.get("http://localhost:8000/projects");
  // const getProjects = async() => {
  //   let Projects = await axios.get("http://localhost:8000/projects");
  //   return Projects;
  // }
  // const projects = () => {
  //   axios.get("http://localhost:8000/projects")
  //   .then(res => {return res.data})
  // }

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // async function fetchData() {
    //   const dati = await axios.get("http://localhost:8000/projects");
    //   setProjects(dati.data);
    //   return dati;
    // }
    // fetchData();
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
        {/* {getProjects()
        .then(project => <h1>{project}</h1>)} */}
      {/* <button type="button" class="btn btn-secondary" onClick={() => setButtonPopup(true)}>Create new project</button>
      <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <input type={"text"} placeholder={"name of project"} id={"nameProject"}></input>
        <br />
        <br />
        <button type="button" class="btn btn-success" onClick={() => {
          const nameProject = document.getElementById("nameProject").value;
          axios.post(`http://localhost:8000/new_project/${nameProject}`);
        }}>
          create project
        </button>
      </Popup> */}
    </>
  );
}

export default App;



          