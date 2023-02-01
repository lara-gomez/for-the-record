import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/Navbar.js";
import Spotify from "./pages/Spotify.js";
import Home from "./pages/Home.js";
import Feed from "./pages/Feed.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [refToken, setRefToken] = useState(null);

  const handleLogin = (t, id, refT) => {
    setToken(t);
    setUserId(id);
    setRefToken(refT);
    console.log(t, id, refT);
  };

  //create countdown
  const refresh = async () => {
    setRefToken(await get("/api/spotify/refresh_token", { refresh_token: refToken}));
  };

  return (
    <>
      {refresh}
      <NavBar handleLogin={handleLogin} token={token} userId={userId}/>
      <Router>
        <Spotify path="/spotifyPage" />
        <NotFound default />
        <Home path="/" token={token} userId={userId}/>
        <Feed path="/feed" token={token} userId={userId}/>
      </Router>
    </>
  );
};

export default App;
