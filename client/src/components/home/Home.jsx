import React from "react";

import "./Home.css";
import Navbar from "../navbar/Navbar";
import Story from "../stories/Story";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Story />
    </div>
  );
};

export default Home;
