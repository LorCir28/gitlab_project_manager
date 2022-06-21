const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const getProjects = async(userId) => {
    projects =  await api.Users.projects(userId);
    return projects;
}



module.exports = getProjects;