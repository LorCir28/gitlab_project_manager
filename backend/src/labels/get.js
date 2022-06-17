const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

// const createNewProject = async(projectName) => {
//     const newProject = await api.Projects.create({"name": projectName});
//     return newProject
// }

const getLabelsbyproject = async(projectLabel) => {
    const user = await api.Users.current();
    let projects = await api.Users.projects(user.id);
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === projectLabel) {
        let labels = await api.Labels.all(projects[i].id);
        return labels;
        }
    }
}



module.exports = getLabelsbyproject;