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

  const [ButtonPopupListLabels, setButtonPopupListLabels] = useState(false);
  const [ButtonPopupCreateLabel, setButtonPopupCreateLabel] = useState(false);
  const [ButtonPopupDeleteLabel, setButtonPopupDeleteLabel] = useState(false);

  const [ButtonPopupListProjectMembers, setButtonPopupListProjectMembers] = useState(false);
  const [ButtonPopupCreateProjectMember, setButtonPopupCreateProjectMember] = useState(false);
  const [ButtonPopupDeleteProjectMember, setButtonPopupDeleteProjectMember] = useState(false);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/projects")
    .then(res => {return res.json()})
    .then(data => setProjects(data))
  }, [])

  const [labels, setLabels] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);

  const [projectLabel, setProjectLabel] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8000/labels/${projectLabel}`)
    .then(res => {return res.json()})
    .then(data => {
      setLabels(data);
      // console.log(labels);
    })
  }, [projectLabel])

  const [project, setProject] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8000/projectsMembers/${project}`)
    .then(res => {return res.json()})
    .then(data => {
      setProjectMembers(data);
      // console.log(projectMembers);
    })
  }, [project])

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
          <Card setButtonPopupList={setButtonPopupListLabels} setButtonPopupCreate={setButtonPopupCreateLabel}
            setButtonPopupDelete={setButtonPopupDeleteLabel} item={"labels"} />
          <Card setButtonPopupList={setButtonPopupListProjectMembers} setButtonPopupCreate={setButtonPopupCreateProjectMember}
            setButtonPopupDelete={setButtonPopupDeleteProjectMember} item={"project members"} />
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


          {/* list labels popup */}
          <Popup trigger={ButtonPopupListLabels} setTrigger={setButtonPopupListLabels}>

            project name<select id="project_label">
            {projects && projects.map((project) => (
              <option><ProjectItem item={project} key={project.id}/></option>
            ))}
            </select>

            <br />
            <br />
            

            <button className="btn btn-info" id="btn-listlabelspopup" onClick={() => {

              setProjectLabel(document.getElementById("project_label").value);

            }}>
              list labels
            </button>

            
            {labels && labels.map((label) => (
              <ProjectItem item={label} key={label.id}/>
            ))}

          </Popup>


          {/* create new label popup */}
          <Popup trigger={ButtonPopupCreateLabel} setTrigger={setButtonPopupCreateLabel}>
              <input type={"text"} placeholder={"name of label"} id={"nameLabel"} required></input>

              colour of label<select id="colour-label-popup">
                <option>white</option>
                <option>red</option>
                <option>yellow</option>
                <option>grey</option>
                <option>black</option>
                <option>green</option>
                <option>violet</option>
                <option>orange</option>
                <option>brown</option>
              </select>

              <br />
              <br />

              project name<select id="project_create_label">
              {projects && projects.map((project) => (
                <option><ProjectItem item={project} key={project.id}/></option>
              ))}
              </select>

              <br />
              <br />

              <button type="button" className="btn btn-success" id = "btn-createlabelpopup" onClick={() => {

                const nameLabel = document.getElementById("nameLabel").value;
                const nameProject = document.getElementById("project_create_label").value;
                const colourLabel = document.getElementById("colour-label-popup").value;

                // control: label name can't be empty
                if (nameLabel === "") {
                  alert("label name can't be empty");
                  return false;
                }

                axios.post(`http://localhost:8000/new_label`, {
                  nameLabel: nameLabel,
                  nameProject: nameProject,
                  colourLabel: colourLabel
                });

                setButtonPopupCreateLabel(false);
                window.location.reload();
              }}>
                create label
              </button>

          </Popup>

          {/* delete label popup */}
          <Popup trigger={ButtonPopupDeleteLabel} setTrigger={setButtonPopupDeleteLabel}>

            project name<select id="project_delete_label" onChange={() => setProjectLabel(document.getElementById("project_delete_label").value)}>
              <option></option>
              {projects && projects.map((project) => (
                <option><ProjectItem item={project} key={project.id}/></option>
              ))}
            </select>

            

            label name<select id="label_to_delete">
            {labels && labels.map((label) => (
              <option><ProjectItem item={label} key={label.id}/></option>
            ))}
            </select>

            <br />
            <br />

            <button type="button" className="btn btn-danger" id="btn-deletelabelpopup" onClick={() => {

              const nameProject = document.getElementById("project_delete_label").value;
              const nameLabel = document.getElementById("label_to_delete").value;

              // control: project name can't be empty
              if (document.getElementById("project_delete_label").value === "") {
                alert("project name can't be empty");
                return false;
              }

              // control: label name can't be empty
              if (document.getElementById("label_to_delete").value === "") {
                alert("label name can't be empty");
                return false;
              }

              axios.post(`http://localhost:8000/delete_label`, {
                nameProject: nameProject,
                nameLabel: nameLabel
              });

              setButtonPopupDeleteLabel(false);
              window.location.reload();
            }}>
              delete label
            </button>

          </Popup>


          {/* list project members popup */}
          <Popup trigger={ButtonPopupListProjectMembers} setTrigger={setButtonPopupListProjectMembers}>

            project name<select id="project_members">
            {projects && projects.map((project) => (
              <option><ProjectItem item={project} key={project.id}/></option>
            ))}
            </select>

            <br />
            <br />
            

            <button className="btn btn-info" id="btn-listprojectmemberspopup" onClick={() => {

              setProject(document.getElementById("project_members").value);

            }}>
              list members
            </button>

            
            {projectMembers && projectMembers.map((projectMember) => (
              <ProjectItem item={projectMember} key={projectMember.id}/>
            ))}

          </Popup>


          {/* create new project member popup */}
          <Popup trigger={ButtonPopupCreateProjectMember} setTrigger={setButtonPopupCreateProjectMember}>
              <input type={"text"} placeholder={"username"} id={"nameUser"} required></input>

              access level<select id="accessLevel">
                <option>Guest</option>
                <option>Reporter</option>
                <option>Developer</option>
                <option>Maintainer</option>
              </select>

              <br />
              <br />

              project name<select id="project_create_member">
              {projects && projects.map((project) => (
                <option><ProjectItem item={project} key={project.id}/></option>
              ))}
              </select>

              <br />
              <br />

              <button type="button" className="btn btn-success" id = "btn-createprojectmemberpopup" onClick={() => {

                const nameUser = document.getElementById("nameUser").value;
                const nameProject = document.getElementById("project_create_member").value;
                const accessLevel = document.getElementById("accessLevel").value;

                // control: user name can't be empty
                if (nameUser === "") {
                  alert("username can't be empty");
                  return false;
                }

                axios.post(`http://localhost:8000/new_project_member`, {
                  nameUser: nameUser,
                  nameProject: nameProject,
                  accessLevel: accessLevel
                })

                setButtonPopupCreateProjectMember(false);
                window.location.reload();
              }}>
                add user
              </button>

          </Popup>


           {/* delete project member popup */}
           <Popup trigger={ButtonPopupDeleteProjectMember} setTrigger={setButtonPopupDeleteProjectMember}>

            project name<select id="project_delete_member" onChange={() => setProject(document.getElementById("project_delete_member").value)}>
              <option></option>
              {projects && projects.map((project) => (
                <option><ProjectItem item={project} key={project.id}/></option>
              ))}
            </select>



            member<select id="member_to_delete">
            {projectMembers && projectMembers.map((projectMember) => (
              <option><ProjectItem item={projectMember} key={projectMember.id}/></option>
            ))}
            </select>

            <br />
            <br />

            <button type="button" className="btn btn-danger" id="btn-deleteprojectmemberpopup" onClick={() => {

              const nameProject = document.getElementById("project_delete_member").value;
              const nameMember = document.getElementById("member_to_delete").value;

              // control: project name can't be empty
              if (document.getElementById("project_delete_member").value === "") {
                alert("project name can't be empty");
                return false;
              }

              // control: label name can't be empty
              if (document.getElementById("member_to_delete").value === "") {
                alert("member name can't be empty");
                return false;
              }

              axios.post(`http://localhost:8000/delete_project_member`, {
                nameProject: nameProject,
                nameMember: nameMember
              });

              setButtonPopupDeleteProjectMember(false);
              window.location.reload();
            }}>
              remove member
            </button>

          </Popup>

    </div>
    </>
  );
}

export default App;
          