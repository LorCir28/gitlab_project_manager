import React from "react";
import "./css/popup.css"

const Popup = (props) => {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => {
          props.setTrigger(false);
          const background = document.getElementById("general-container");
          background.style.filter = "blur(0px)";
        }}>close</button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Popup;