import React, { useState } from "react";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {

  return (
    <div className="Home-container">
      <img src="logo.png" className="logo" />
      <div className="site-description">search for songs. leave a review. share with friends.</div>
    </div>
  );
};

export default Home;
