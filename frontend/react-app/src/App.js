import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "./components/navbar"
import Popup from "./components/popup"
import {useState} from "react"
import axios from "axios"

function App() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <br />
      <br />
      <button type="button" class="btn btn-secondary" onClick={() => setButtonPopup(true)}>Create new project</button>
      <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <br />
        {/* <form action="/project-creation" method="post"> */}
          <input type={"text"} placeholder={"name of project"} id={"nameProject"}></input>
          {/* <input type={"text"} placeholder={"name of label 1"} id={"nameLabel1"}></input>
          <input type={"text"} placeholder={"color of label 1"} id={"colorLabel1"}></input> */}
        {/* </form> */}
        <br />
        <br />
        <button type="button" class="btn btn-success" onClick={() => {
          const nameProject = document.getElementById("nameProject").value;
          // const nameLabel1 = document.getElementById("nameLabel1").value;
          // const colorLabel1 = document.getElementById("colorLabel1").value;
          axios.post(`http://localhost:8000/new_project/${nameProject}`);
        }}>
          create project
        </button>
      </Popup>
    </React.Fragment>
  );
}

export default App;



          