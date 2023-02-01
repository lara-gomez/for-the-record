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
// const [userId, setUserId] = useState(undefined);
// const [token, setToken] = useState(null);

// const createToken = (e) => {
//   async function getToken() {
//     console.log("doing stuff");
//     const response = await fetch("/api/spotify/token");
//     const json = await response.json();
//     if (response.status === 200) {
//       setToken(json.access_token);
//       console.log(json.access_token);
//     } else {
//       console.log("error with token");
//     }
//   }
//   getToken();
// };

  return (
    <nav className="NavBar-container">
      <div className="Navbar-LinkContainer u-inlineBlock">
        {props.token ? (
          <Link to="/feed" className="NavBar-link">
          Feed
          </Link>
        ) : (
          <Spotify handleLogin={props.handleLogin}/>
        )}
      </div>
      {/* <div className="u-inlineBlock">test</div> */}
    </nav>
  );
};

export default NavBar;
