const { Module } = require("module");

const { Gitlab } = require('@gitbeaker/node');
const getUsers = require("../users/get");
const getProjects = require("../projects/get");
const getProjectMembers = require("./get");

const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx', 
});

const removeProjectMember = async(nameProject, nameMember) => {

    const user = await getUsers();

    let projects = await getProjects(user.id);

    let members;
    let projectId;
    projects.map(async(project) => {
        if (project.name === nameProject) {
            projectId = project.id;
            members = await getProjectMembers(nameProject);
            members.map(async(member) => {
                if (member.name === nameMember) {
                    await api.ProjectMembers.remove(projectId, member.id);
                }
            })
        }
    })

}



module.exports = removeProjectMember;