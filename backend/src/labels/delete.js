const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');
const getUsers = require("../users/get");
const getProjects = require("../projects/get");
const getLabelsByProject = require("./get");

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const deleteLabel = async(nameProject, nameLabel) => {
    const user = await getUsers();

    let projects = await getProjects(user.id);

    let projectId
    projects.map((project) => {
        if (project.name === nameProject) {
            projectId = project.id;
        }
    })
    let labels = await getLabelsByProject(nameProject);
    labels.map(async (label) => {
        if (label.name === nameLabel) {
            await api.Labels.remove(projectId, label.id);
            return;
        }
    })
}



module.exports = deleteLabel;