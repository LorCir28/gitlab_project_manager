const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');
const getProjects = require("./get");
const getUsers = require("../users/get");

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const deleteProject = async(nameProject) => {
    const user = await getUsers();

    let projects = await getProjects(user.id);
    projects.map((project) => {
        if (project.name === nameProject) {
            api.Projects.remove(project.id);
            return;
        }
    })
}



module.exports = deleteProject;