const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({ 
  token : 'put your token generated through gitlab', 
});

const getUsers = async () => {
    let user = await api.Users.current();
  
    return user;
  }


module.exports = getUsers;