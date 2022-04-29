const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});


const createBoardList = async(projectId, requiredBoardId, labelId) => {
    const newBoardList = await api.ProjectIssueBoards.createList(projectId, requiredBoardId, labelId);
    return newBoardList;
}


module.exports = createBoardList;