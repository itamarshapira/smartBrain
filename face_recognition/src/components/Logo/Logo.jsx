import React from "react";
import "./Logo.css";
import Tilt from "react-parallax-tilt";
import logo from "./logo.png";

function Logo() {
  return (
    <div className="tc animate__animated animate__backInDown">
      <Tilt
        className=" tilt background-stripes track-on-window"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.75}
        glarePosition="all"
        scale={1.02}
        trackOnWindow={true}
      >
        <div className="inner-element">
          <img id="logoImage" src={logo} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
