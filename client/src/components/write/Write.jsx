import React from "react";

import "./Write.css";
import Navbar from "../navbar/Navbar";
import Editor from "../editor/Editor";

const Write = () => {
  return (
    <div className="container">
      <Navbar />
      <Editor />
    </div>
  );
};

export default Write;
