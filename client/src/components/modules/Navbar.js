import React from "react";
import { Link } from "@reach/router";
import Spotify from "../pages/Spotify.js";

import "./Navbar.css";
import "../../utilities.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 * Prototypes
 */

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="Navbar-LinkContainer u-inlineBlock">
        <Spotify className="NavBar-link"/>
        <Link to="/feed" className="NavBar-link">
          Feed
        </Link>
      </div>
      {/* <div className="u-inlineBlock">test</div> */}
    </nav>
  );
};

export default NavBar;
