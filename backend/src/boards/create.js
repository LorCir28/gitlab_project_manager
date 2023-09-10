const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'put your token generated through gitlab', 
});


const createRequiredBoard = async(projectId) => {
    const requiredBoard = await api.ProjectIssueBoards.create(projectId, "required_board");
    return requiredBoard
}

module.exports = createRequiredBoard