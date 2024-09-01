import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div className="all">
      <p className="f3">
        This Magic Brain detects faces and estimates the age of people in your
        pictures!
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className=" detectBtn w-30 grow f4 link ph3 pv2 dib  "
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
