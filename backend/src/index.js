
// const express = require("express");

// const { Gitlab } = require('@gitbeaker/node');

// const api = new Gitlab({ 
//   token : 'glpat-zvPjAxXA2jjToS4MMDzx',
// });

// const app = express();

// const createNewProject = require("./projects/create");

// const createRequiredBoard = require("./boards/create");

// const createLabel = require("./labels/create");

// const createBoardList = require("./board_lists/create");


// // automate the creation of the required board at the creation of a new project

// app.post("/new_project/:projectName", async(req, res) => {
//   const {projectName} = req.params;

//   const newProject = await createNewProject(projectName);
//   const requiredBoard = await createRequiredBoard(newProject.id);

//   // with Promise.all() I resolve before all the labels at the same time, and then I create the boardlists one after the other

//   const Labels = [createLabel(newProject.id, "Resources", "blue"), createLabel(newProject.id, "To Do", "orange"), 
//                   createLabel(newProject.id, "Doing", "green"), createLabel(newProject.id, "Blocked", "red"), 
//                   createLabel(newProject.id, "Quality Check", "yellow"), createLabel(newProject.id, "Acceptance Gateway", "violet")];

//   const labels = await Promise.all(Labels);

//   for (const label of labels) {
//     await createBoardList(newProject.id, requiredBoard.id, label.id);
//   }
  

//   res.send("created new project and required board in it");
// })



// app.listen(8000, () => {
//   console.log("server is listening on port 8000...");
// });


////////////////////////////////////////////////////////////////////////////////////////


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


// manage form to create a new project with input name and labels


// return projects list

app.get("/projects", async(req, res) => {
  let user = await api.Users.current();
  let projects = await api.Users.projects(user.id);
  res.send(projects.map(project => ({
      name: project.name,
      id: project.id
    })
  ));
})


// delete project

app.post("/delete_project", async(req, res) => {
  const {nameProject} = req.body;

  const user = await getUsers();

  let projects = await api.Users.projects(user.id);
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === nameProject) {
      api.Projects.remove(projects[i].id);
      res.send("project deleted");
      break;
    }
  }

})

// create new project

app.post("/new_project", async(req, res) => {

  const {nameProject} = req.body;
  const {inputLabels} = req.body;

  const newProject = await createNewProject(nameProject);
  const requiredBoard = await createRequiredBoard(newProject.id);

  inputLabels.map(async (inputLabel) => {
  let label = await createLabel(newProject.id, inputLabel.nameLabel, inputLabel.colourLabel);
  await createBoardList(newProject.id, requiredBoard.id, label.id);
  });

  
  res.send("created new project and required board in it");
})


// return labels list

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

  const user = await getUsers();

  let projects = await api.Users.projects(user.id);
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === nameProject) {
      await api.Labels.create(projects[i].id, nameLabel, colourLabel);
      break;
    }
  }

})


// delete label

app.post("/delete_label", async (req, res) => {

  const {nameProject} = req.body;
  const {nameLabel} = req.body;

  const user = await getUsers();

  let projects = await api.Users.projects(user.id);
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === nameProject) {
      let labels = await api.Labels.all(projects[i].id);
      for (let j = 0; j < labels.length; j++) {
        if (labels[j].name === nameLabel) {
          await api.Labels.remove(projects[i].id, labels[j].id);
          break;
        }
      }
    }
  }

}) 


// return project members list

app.get("/projectsMembers/:project", async(req, res) => {

  const {project} = req.params;

  let user = await api.Users.current();
  let projects = await api.Users.projects(user.id);

  let projectMembers;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === project) {
      projectMembers = await api.ProjectMembers.all(projects[i].id);
    }
  }

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

  let AccessLevel;

  if (accessLevel === "Guest") {
    AccessLevel = 10;
  }
  else if (accessLevel === "Reporter") {
    AccessLevel = 20;
  }
  else if (accessLevel === "Developer") {
    AccessLevel = 30;
  }
  else if (accessLevel === "Maintainer") {
    AccessLevel = 40;
  }

  let user_to_add = await api.Users.search(nameUser);

  let user = await api.Users.current();
  let projects = await api.Users.projects(user.id);
  // console.log(user_to_add);

  let projectId;
  let userId;
  if (user_to_add.length == 1) {
    userId = user_to_add[0].id;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].name === nameProject) {
        projectId = projects[i].id;
        projectMembers = await api.ProjectMembers.all(projects[i].id);
        for (let j = 0; j < projectMembers.length; j++) {
          if (projectMembers[j].username == nameUser) {
            res.send("utente fa già parte del gruppo");
            return;
          }
        }
      }
    }
    api.ProjectMembers.add(projectId, userId, AccessLevel);
  }
  else {
    res.send("utente non trovato, impossibile aggiungerlo");
  }

})


// delete project member

app.post("/delete_project_member", async (req, res) => {

  const {nameProject} = req.body;
  const {nameMember} = req.body;

  const user = await getUsers();

  let projects = await api.Users.projects(user.id);
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === nameProject) {
      let members = await api.ProjectMembers.all(projects[i].id);
      for (let j = 0; j < members.length; j++) {
        if (members[j].name === nameMember) {
          await api.ProjectMembers.remove(projects[i].id, members[j].id);
          res.send("member deleted");
        }
      }
    }
  }

}) 







app.listen(8000, () => {
  console.log("server is listening on port 8000...");
});

