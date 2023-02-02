import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import "./Spotify.css";

function Spotify(props) {

  useEffect(() => {
    async function getToken() {
      console.log("doing stuff");
      const response = await fetch("/api/spotify/token");
      const json = await response.json();
      if (response.status === 200) {
        props.handleLogin(json.access_token, json.spotify_id, json.refresh_token);
        console.log("got token");
        navigate("/feed");
      } else {
        console.log("error with token");
      }
    }

    getToken();
  }, []);

  return <a href="/api/spotify/login">
    Login with Spotify
    </a>;
}

export default Spotify;
