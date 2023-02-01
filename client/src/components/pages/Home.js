import React, { useState } from "react";
import SearchBar from "../modules/SearchBar.js";
import { navigate } from "@reach/router"

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  if(props.userId){
    navigate("/feed");
  }
  return (
    <div className="Home-container">
      <img src="logo.png" className="logo" />
      <SearchBar token={props.token} userId={props.userId}/>
    </div>
  );
};

export default Home;
