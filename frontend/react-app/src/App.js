import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "./components/navbar"
import Popup from "./components/popup"
import {useState, useEffect} from "react"
import axios from "axios"
import ProjectItem from "./components/projectItem";
import InputLabel from "./components/InputLabel";
import Card from "./components/card";

function App() {
  const [ButtonPopupListProjects, setButtonPopupListProjects] = useState(false);
  const [ButtonPopupCreateProject, setButtonPopupCreateProject] = useState(false);
  const [ButtonPopupDeleteProject, setButtonPopupDeleteProject] = useState(false);

  const [ButtonPopupListGroups, setButtonPopupListGroups] = useState(false);
  const [ButtonPopupCreateGroup, setButtonPopupCreateGroup] = useState(false);
  const [ButtonPopupDeleteGroup, setButtonPopupDeleteGroup] = useState(false);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/projects")
    .then(res => {return res.json()})
    .then(data => setProjects(data))
  }, [])

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/groups")
    .then(res => {return res.json()})
    .then(data => setGroups(data))
  }, [])

  const [inputLabels, setInputLabel] = useState([]);

  return (
    <>
    <Navbar />
    <div id="external-container">

      <div className="container" id="general-container">
          <h1 id="page_title">Welcome to my Gitlab project Manager. Here you can manage your gitlab projects with a simple interface</h1>
        <div className="row">
          <Card setButtonPopupList={setButtonPopupListProjects} setButtonPopupCreate={setButtonPopupCreateProject}
            setButtonPopupDelete={setButtonPopupDeleteProject} item={"projects"} />
          <Card setButtonPopupList={setButtonPopupListGroups} setButtonPopupCreate={setButtonPopupCreateGroup}
            setButtonPopupDelete={setButtonPopupDeleteGroup} item={"groups"} />
        </div>
      </div>

      {/* list project popup */}
      <Popup trigger={ButtonPopupListProjects} setTrigger={setButtonPopupListProjects}>
        <h2 id="h1_projects"><b>PROJECTS:</b></h2>
        {projects && projects.map((project) => (
          <ProjectItem item={project} key={project.id}/>
        ))}
      </Popup>

      {/* create new project popup */}
      <Popup trigger={ButtonPopupCreateProject} setTrigger={setButtonPopupCreateProject}>
              <input type={"text"} placeholder={"name of project"} id={"nameProject"} required></input>

              <br />
              <br />

              { inputLabels.map((inputLabel) => (
                <InputLabel id={inputLabels.indexOf(inputLabel)}/>
              )) }

              <button type="button" className="btn btn-primary" id="btn-addlabel" onClick={() => {
                setInputLabel([...inputLabels, { nameLabel: '', colourLabel: ''}]);
              }}>
                add label
              </button>

              <button type="button" className="btn btn-secondary" onClick={() => {
                const values = [...inputLabels];
                values.pop();
                setInputLabel(values);
              }}>
                remove label
              </button>

              <br />
              <br />

              <button type="button" className="btn btn-success" onClick={() => {

                const nameProject = document.getElementById("nameProject").value;

                // control: project name can't be empty
                if (nameProject === "") {
                  alert("project name can't be empty");
                  return false;
                }

                // control: name label can't be empty
                for (let i = 0; i < inputLabels.length; i++) {
                  if (document.getElementById(i).value === "") {
                    alert("name label can't be empty");
                    return false;
                  }
                }

                const labels = inputLabels;
                for (let i = 0; i < labels.length; i++) {
                  labels[i].nameLabel = document.getElementById(i).value;
                  labels[i].colourLabel = document.getElementById(i+100).value;
                }
                axios.post(`http://localhost:8000/new_project`, {
                  nameProject: nameProject,
                  inputLabels: labels
                });

                setButtonPopupCreateProject(false);
                window.location.reload();
              }}>
                create project
              </button>

          </Popup>


          {/* delete project popup */}
          <Popup trigger={ButtonPopupDeleteProject} setTrigger={setButtonPopupDeleteProject}>

            project name<select id="project_to_delete">
            {projects && projects.map((project) => (
              <option><ProjectItem item={project} key={project.id}/></option>
            ))}
            </select>

            <br />
            <br />

            <button type="button" className="btn btn-danger" id="btn-deleteprojectpopup" onClick={() => {
              const nameProject = document.getElementById("project_to_delete").value;
              axios.post(`http://localhost:8000/delete_project`, {
                nameProject: nameProject,
              });

              setButtonPopupDeleteProject(false);
              window.location.reload();
            }}>
              delete project
            </button>

          </Popup>


          {/* list group popup */}
          <Popup trigger={ButtonPopupListGroups} setTrigger={setButtonPopupListGroups}>
            <h2 id="h1_projects"><b>GROUPS:</b></h2>
            {groups && groups.map((group) => (
              <ProjectItem item={group} key={group.id}/>
            ))}
          </Popup>


          {/* create new group popup */}
          <Popup trigger={ButtonPopupCreateGroup} setTrigger={setButtonPopupCreateGroup}>
              <input type={"text"} placeholder={"name of group"} id={"nameGroup"} required></input>

              <br />
              <br />

              <button type="button" className="btn btn-success" onClick={() => {

                const nameGroup = document.getElementById("nameGroup").value;

                // control: group name can't be empty
                if (nameGroup === "") {
                  alert("group name can't be empty");
                  return false;
                }

                axios.post(`http://localhost:8000/new_group`, {
                  nameGroup: nameGroup,
                });

                setButtonPopupCreateGroup(false);
                window.location.reload();
              }}>
                create group
              </button>

          </Popup>

          {/* delete group popup */}
          <Popup trigger={ButtonPopupDeleteGroup} setTrigger={setButtonPopupDeleteGroup}>

            group name<select id="group_to_delete">
            {groups && groups.map((group) => (
              <option><ProjectItem item={group} key={group.id}/></option>
            ))}
            </select>

            <br />
            <br />

            <button type="button" className="btn btn-danger" id="btn-deletegrouppopup" onClick={() => {
              const nameGroup = document.getElementById("group_to_delete").value;
              axios.post(`http://localhost:8000/delete_group`, {
                nameGroup: nameGroup,
              });

              setButtonPopupDeleteGroup(false);
              window.location.reload();
            }}>
              delete project
            </button>

          </Popup>

    </div>
    </>
  );
}

export default App;



          