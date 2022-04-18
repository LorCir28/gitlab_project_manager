const { Gitlab } = require('@gitbeaker/node');


const api = new Gitlab({ 
  token : 'glpat-zvPjAxXA2jjToS4MMDzx' , 
}); 

//////////////////////////////////////////////////////// 

const getProjects = async () => {
  let user = await api.Users.current();
  console.log("IDDDDDD ", user.id);
  let projects = await api.Users.projects(user.id);
  return projects;
}

getProjects().then(projects => {
  console.log(projects.map(project => project.name));
  // console.log(projects);
})

////////////////////////////////////////////////////////

// api.Users.current().then(user => {
//   api.Users.projects(user.id).then(projects => {
//     console.log(projects);
//   });
// })