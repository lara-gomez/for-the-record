import React, { useState } from "react";
import { Link } from "@reach/router";
import Spotify from "../pages/Spotify.js";

import "./Navbar.css";
import "../../utilities.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 * Prototypes
 */

const NavBar = (props) => {
const [userId, setUserId] = useState(undefined);

  return (
    <nav className="NavBar-container">
      <div className="Navbar-LinkContainer u-inlineBlock">
        {props.token ? (
          <Link to="/feed" className="NavBar-link">
          Feed
          </Link>
          ) : (
          <Spotify className="NavBar-link"/>
          )}
      </div>
      {/* <div className="u-inlineBlock">test</div> */}
    </nav>
  );
};

export default NavBar;
