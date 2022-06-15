
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


// automate the creation of the required board at the creation of a new project

app.post("/new_project/:projectName", async(req, res) => {
  const {projectName} = req.params;

  const newProject = await createNewProject(projectName);
  const requiredBoard = await createRequiredBoard(newProject.id);

  const labels = req.body;

  const keys = Object.keys(labels);
  for (key of keys) {
    const lab = await createLabel(newProject.id, labels[key].name, labels[key].color);
    await createBoardList(newProject.id, requiredBoard.id, lab.id);
  }


  res.send("created new project and required board in it");
})


// manage form to create a new project with input name and labels

// app.post("/project-creation", (req, res) => {
//   console.log(req.body);
// })


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



// return project with name 'nameProject' and label with name 'nameLabel' and colour 'colourLabel'

// app.post("/new_project", async(req, res) => {
//   // const {nameProject} = req.params;
//   // const {nameLabel} = req.params;
//   // const {colourLabel} = req.params;

//   const {nameProject} = req.body;
//   const {nameLabel} = req.body;
//   const {colourLabel} = req.body;

//   const newProject = await createNewProject(nameProject);
//   const requiredBoard = await createRequiredBoard(newProject.id);
//   const label = await createLabel(newProject.id, nameLabel, colourLabel);
//   await createBoardList(newProject.id, requiredBoard.id, label.id);

  
//   res.send("created new project and required board in it");
// })

app.post("/new_project", async(req, res) => {
  // const {nameProject} = req.params;
  // const {nameLabel} = req.params;
  // const {colourLabel} = req.params;

  const {nameProject} = req.body;
  // const {nameLabel} = req.body;
  // const {colourLabel} = req.body;
  const {inputLabels} = req.body;
  // console.log(inputLabels);

  const newProject = await createNewProject(nameProject);
  const requiredBoard = await createRequiredBoard(newProject.id);

  inputLabels.map(async (inputLabel) => {
    // console.log(inputLabel);
  let label = await createLabel(newProject.id, inputLabel.nameLabel, inputLabel.colourLabel);
  await createBoardList(newProject.id, requiredBoard.id, label.id);
  });
  // const label = await createLabel(newProject.id, nameLabel, colourLabel);
  // await createBoardList(newProject.id, requiredBoard.id, label.id);

  
  res.send("created new project and required board in it");
})

// const fs = require("fs");

// app.post("/add-label", (req, res)  => {
//   var data = fs.readFileSync('../frontend/react-app/src/App.js').toString().split("\n");
//   data.splice(47, 0, "<input type={'text'} placeholder={'name of label'} id={'nameLabel'}></input><input type={'text'} placeholder={'colour of label'} id={'colourLabel'}></input>");
//   var text = data.join("\n");
//   fs.writeFileSync("../frontend/react-app/src/App.js", text);

//   res.send("label created")
// })






app.listen(8000, () => {
  console.log("server is listening on port 8000...");
});

