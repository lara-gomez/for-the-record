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

  // useEffect(() => {
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
  // }, []);

  // useEffect(() => {
  //   get("/api/whoami").then((user) => {
  //     if (user._id) {
  //       // they are registed in the database, and currently logged in.
  //       setUserId(user._id);
  //     }
  //   });
  // }, []);

  // const handleLogin = (credentialResponse) => {
  //   const userToken = credentialResponse.credential;
  //   const decodedCredential = jwt_decode(userToken);
  //   console.log(`Logged in as ${decodedCredential.name}`);
  //   post("/api/login", { token: userToken }).then((user) => {
  //     setUserId(user._id);
  //     post("/api/initsocket", { socketid: socket.id });
  //   });
  // };

  // const handleLogout = () => {
  //   setUserId(undefined);
  //   post("/api/logout");
  // };

  const handleLogin = (t, id, refT) => {
    setToken(t);
    setUserId(id);
    setRefToken(refT);
    console.log(t, id, refT);
  };

  //create countdown

  return (
    <>
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
