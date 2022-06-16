const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});


// const createLabel = async(projectId, labelName, labelColor) => {
//     const newLabel = await api.Labels.create(projectId, labelName, labelColor)
//     return newLabel;
// }

const getGroups = async() => {
    let groups = await api.Groups.all();
    return groups;
}


module.exports = getGroups;