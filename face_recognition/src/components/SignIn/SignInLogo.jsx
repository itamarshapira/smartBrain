import React from "react";
import "./SignInLogo.css";
import Tilt from "react-parallax-tilt";
import LOGO from "./SignInLogo.png";

function SignInLogo() {
  return (
    <div className=" tc animate__animated animate__backInDown">
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.9}
        glareColor="lightblue"
        glarePosition="all"
        glareBorderRadius="20px"
      >
        <div className="">
          <img id="logoImage" src={LOGO} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
}

export default SignInLogo;
