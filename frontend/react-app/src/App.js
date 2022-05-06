import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "./components/navbar"
import Popup from "./components/popup"
import {useState} from "react"

function App() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <br />
      <br />
      <button type="button" class="btn btn-secondary" onClick={() => setButtonPopup(true)}>Projects</button>
      <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <h3>PROJECTS LIST</h3>
        <br />
        <button type="button" class="btn btn-success" onClick={() => setButtonPopup(true)}>create new project</button>
      </Popup>
    </React.Fragment>
  );
}

export default App;
