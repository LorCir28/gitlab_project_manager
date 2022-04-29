
const express = require("express");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const app = express();

const createNewProject = require("./projects/create");

const createRequiredBoard = require("./boards/create");

const createLabel = require("./labels/create");

const createBoardList = require("./board_lists/create");


// automate the creation of the required board at the creation of a new project

app.post("/new_project/:projectName", async(req, res) => {
  const {projectName} = req.params;

  const newProject = await createNewProject(projectName);
  const requiredBoard = await createRequiredBoard(newProject.id);

  // with Promise.all() I resolve before all the labels at the same time, and then I create the boardlists one after the other

  const Labels = [createLabel(newProject.id, "Resources", "blue"), createLabel(newProject.id, "To Do", "orange"), 
                  createLabel(newProject.id, "Doing", "green"), createLabel(newProject.id, "Blocked", "red"), 
                  createLabel(newProject.id, "Quality Check", "yellow"), createLabel(newProject.id, "Acceptance Gateway", "violet")];

  const labels = await Promise.all(Labels);

  // labels.map(async label => {
  //   await createBoardList(newProject.id, requiredBoard.id, label.id);
  // })

  for (const label of labels) {
    await createBoardList(newProject.id, requiredBoard.id, label.id);
  }
  

  res.send("created new project and required board in it");
})



app.listen(8000, () => {
  console.log("server is listening on port 8000...");
});