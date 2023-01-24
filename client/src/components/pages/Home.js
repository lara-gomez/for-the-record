import React, { useState } from "react";

import "../../utilities.css";
import "./Home.css";

import SearchBar from "../modules/SearchBar.js";
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
      <SearchBar />
      <div className="site-description">search for songs. leave a review. share with friends.</div>
    </div>
  );
};

export default Home;
