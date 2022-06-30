const express = require("express");

const { Gitlab } = require('@gitbeaker/node');

const cors = require("cors");

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const app = express();

app.use(express.json());

app.use(cors());

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



const createNewProject = require("./projects/create");

const createRequiredBoard = require("./boards/create");

const createLabel = require("./labels/create");

const createBoardList = require("./board_lists/create");

const getUsers = require("./users/get");

const getLabelsByProject = require("./labels/get");

const getProjects = require("./projects/get");

const deleteProject = require("./projects/delete");

const deleteLabel = require("./labels/delete");

const getProjectMembers = require("./projectMember/get");

const addProjectMember = require("./projectMember/add");

const removeProjectMember = require("./projectMember/remove");


// manage form to create a new project with input name and labels


// return projects list

app.get("/projects", async(req, res) => {
  let user = await getUsers();
  let projects = await getProjects(user.id);
  res.send(projects.map(project => ({
      name: project.name,
      id: project.id
    })
  ));
})


// create new project

app.post("/new_project", async(req, res) => {

  const {nameProject} = req.body;
  const {inputLabels} = req.body;

  const newProject = await createNewProject(nameProject);
  const requiredBoard = await createRequiredBoard(newProject.id);

  inputLabels.map(async (inputLabel) => {
    let label = await createLabel(nameProject, inputLabel.nameLabel, inputLabel.colourLabel);
    await createBoardList(newProject.id, requiredBoard.id, label.id);
  });

  
  res.send("created new project and required board in it");
})


// delete project

app.post("/delete_project", async(req, res) => {
  const {nameProject} = req.body;

  await deleteProject(nameProject);

})


// return labels list

app.get("/labels", (req, res) => {
  return;
})


app.get("/labels/:projectLabel", async(req, res) => {

  const {projectLabel} = req.params;

  let labels = await getLabelsByProject(projectLabel);

  res.send(labels.map(label => ({
      name: label.name,
      id: label.id
    })
  ));

})


// create label

app.post("/new_label", async(req, res) => {

  const {nameProject} = req.body;
  const {nameLabel} = req.body;
  const {colourLabel} = req.body;


  await createLabel(nameProject, nameLabel, colourLabel);

})


// delete label

app.post("/delete_label", async (req, res) => {

  const {nameProject} = req.body;
  const {nameLabel} = req.body;

  await deleteLabel(nameProject, nameLabel);

}) 


// return project members list

app.get("/projectsMembers", (req, res) => {
  return;
})

app.get("/projectsMembers/:project", async(req, res) => {

  const {project} = req.params;

  let projectMembers = await getProjectMembers(project);

  res.send(projectMembers.map(projectMember => ({
      name: projectMember.name,
      id: projectMember.id
    })
  ));

})


// create project member

app.post("/new_project_member", async(req, res) => {

  const {nameProject} = req.body;
  const {nameUser} = req.body;
  const {accessLevel} = req.body;

  addProjectMember(nameProject, nameUser, accessLevel);

})


// delete project member

app.post("/delete_project_member", async (req, res) => {

  const {nameProject} = req.body;
  const {nameMember} = req.body;

  await removeProjectMember(nameProject, nameMember);

}) 







app.listen(8000, () => {
  console.log("server is listening on port 8000...");
});

