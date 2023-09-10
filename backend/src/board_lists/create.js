const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'put your token generated through gitlab', 
});


const createBoardList = async(projectId, requiredBoardId, labelId) => {
    const newBoardList = await api.ProjectIssueBoards.createList(projectId, requiredBoardId, labelId);
    return newBoardList;
}


module.exports = createBoardList;