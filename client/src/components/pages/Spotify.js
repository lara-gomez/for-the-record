import React, { useState, useEffect } from "react";
import "./Spotify.css";

function Spotify() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      console.log("doing stuff");
      const response = await fetch("/api/spotify/token");
      const json = await response.json();
      if (response.status === 200) {
        setToken(json.access_token);
        console.log("got token");
      } else {
        console.log("error with token");
      }
    }

    getToken();
  }, []);

  return <a href="/api/spotify/login">Login with Spotify</a>;
}

export default Spotify;
