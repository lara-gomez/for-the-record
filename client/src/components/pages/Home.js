import React, { useState } from "react";
import SearchBar from "../modules/SearchBar.js";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="Home-container">
      <img src="logo.png" className="logo" />
      <SearchBar token={props.token} userId={props.userId}/>
    </div>
  );
};

export default Home;
