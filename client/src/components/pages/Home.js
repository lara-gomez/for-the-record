import React, { useState } from "react";
import SearchBar from "../modules/SearchBar.js";

import "../../utilities.css";
import "./Home.css";

// const Home = () => {
//   return (
//     <div className="Home-container">
//       <h1 className="Home-title u-textCenter">For The Record</h1>
//       <SearchBar />
//       <img src="logo.png" className="logo" />
//     </div>
//   );
// };

const Home = () => {
  return (
    <div className="Home-container">
      <img src="logo.png" className="logo" />
      <SearchBar loggedIn={false}/>
    </div>
  );
};

export default Home;
