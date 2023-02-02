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

  return (
    <nav className="NavBar-container">
      <div className="Navbar-LinkContainer u-inlineBlock">
        {props.token ? (
          <>
          <span>Logged in as {props.userId}</span>
          <Link to="/" className="NavBar-link">
          Home
          </Link>
          <Link to="/feed" className="NavBar-link">
          Feed
          </Link>
          </>
        ) : (
          <>
          <Spotify handleLogin={props.handleLogin}/>
          </>
        )}
      </div>
      {/* <div className="u-inlineBlock">test</div> */}
    </nav>
  );
};

export default NavBar;
