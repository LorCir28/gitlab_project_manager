const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const getUsers = async () => {
    let user = await api.Users.current();
  
    return user;
  }


module.exports = getUsers;