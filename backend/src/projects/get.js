const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'put your token generated through gitlab', 
});

const getProjects = async(userId) => {
    projects =  await api.Users.projects(userId);
    return projects;
}



module.exports = getProjects;