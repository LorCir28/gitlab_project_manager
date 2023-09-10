const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'put your token generated through gitlab', 
});

const createNewProject = async(projectName) => {
    const newProject = await api.Projects.create({"name": projectName});
    return newProject
}



module.exports = createNewProject;