import React, { useState, useEffect} from "react";

import "./SearchBar.css";
import "../../utilities.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);
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
  //const [songs, setSongs] = useState([]);
  //event = user types in search box
  const handleChange = (e) => {
    //including "target" gets current val
    setSearchInput(e.target.value);
    //getTracks(searchInput).then(res=>res.json).then(data=>console.log(data))
    //getTracks(searchInput, setSongs);
    //console.log(songs);
    // setObject(getTracks(searchInput));
    // console.log(object)
  };

  //event = user presses submit
  const handleSubmit = (e) => {
    getSong(searchInput);
  };

  let songsList = null;
  if(songs.length > 0){
    songsList = songs.map((songObj) => (
      <h2>{songObj}</h2>
    ));
  }
  else{
    songsList = null;
  }

  const getSong = async (songName) => {
    const url = `https://api.spotify.com/v1/search?q=${songName}&type=track&market=US`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      // eslint-disable-next-line arrow-parens
    }).then(async (spotifyServerResponse) => {
      const parsedResponse = await spotifyServerResponse.json();
      const items = parsedResponse.tracks.items;
      const tracks = [];
      for(let i = 0; i < items.length; i++){
        let track = items[i];
        let artists = track.artists;
        for(let j = 0; j < artists.length; j++){
          tracks.push(track.name, ' by ', artists[j].name);
        }
      }
      setSongs(tracks);
      console.log(songs);
      console.log(parsedResponse);
    })
  };

  return (
    <div className="u-textCenter SearchBar-position">
      <input
        type="search"
        placeholder="Search Song Here"
        onChange={handleChange}
        className="SearchBar-input"
        size="50"
        required
      />
      <button type="submit" className="SearchBar-button u-pointer" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
      {songsList}
    </div>
  );
};

export default SearchBar;
