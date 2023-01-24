import React from "react";
import Spotify from "../pages/Spotify.js";

import "./Navbar.css";
import "../../utilities.css";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <Spotify />
      {/* <div className="u-inlineBlock">test</div> */}
    </nav>
  );
};

export default NavBar;
