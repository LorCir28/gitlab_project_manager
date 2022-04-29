const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});


const createLabel = async(projectId, labelName, labelColor) => {
    const newLabel = await api.Labels.create(projectId, labelName, labelColor)
    return newLabel;
}


module.exports = createLabel;