const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');
const getUsers = require("../users/get");
const getProjects = require("../projects/get");
const getProjectMembers = require("./get");

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const addProjectMember = async(nameProject, nameUser, accessLevel) => {

    let AccessLevel;

    if (accessLevel === "Guest") {
        AccessLevel = 10;
    }
    else if (accessLevel === "Reporter") {
        AccessLevel = 20;
    }
    else if (accessLevel === "Developer") {
        AccessLevel = 30;
    }
    else if (accessLevel === "Maintainer") {
        AccessLevel = 40;
    }

    let user_to_add = await api.Users.search(nameUser);

    let user = await getUsers();
    let projects = await getProjects(user.id);

    let projectId;
    let userId;
    let projectMembers;
    if (user_to_add.length == 1) {
        userId = user_to_add[0].id;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].name === nameProject) {
                projectId = projects[i].id;
                projectMembers = await getProjectMembers(nameProject);
                for (let j = 0; j < projectMembers.length; j++) {
                    if (projectMembers[j].username == nameUser) {
                        // res.send("utente fa già parte del gruppo");
                        return;
                    }
                }
            }
        }
        api.ProjectMembers.add(projectId, userId, AccessLevel);
    }
    else {
        res.send("utente non trovato, impossibile aggiungerlo");
    }

}



module.exports = addProjectMember;