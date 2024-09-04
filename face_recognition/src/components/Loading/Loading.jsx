// src/components/Footer.js

import React from "react";
import { DNA } from "react-loader-spinner";
const Loading = () => {
  return (
    <div>
      <h2>Loading... please wait</h2>

      <DNA
        visible={true}
        height="150"
        width="150"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
