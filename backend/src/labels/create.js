const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');
const getProjects = require("../projects/get");
const getUsers = require("../users/get");

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});


const createLabel = async(nameProject, nameLabel, colourLabel) => {

  const user = await getUsers();

  let newLabel;
  let projects = await getProjects(user.id);
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === nameProject) {
      newLabel = await api.Labels.create(projects[i].id, nameLabel, colourLabel);
      return newLabel;
    }
  }

}


module.exports = createLabel;