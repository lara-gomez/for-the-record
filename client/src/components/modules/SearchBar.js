import React, { useState, useEffect} from "react";
import Song from "./Song.js";

import "./SearchBar.css";
import "../../utilities.css";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [songComponent, setSongComponent] = useState(undefined);

  //event = user types in search box
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    if(e.target.value === ""){
      setSongComponent(undefined);
      setSongs([]);
    }
  };

  //event = user presses submit
  const handleSubmit = (e) => {
    setSongComponent(undefined);
    getSong(searchInput);
  }

  const getSong = async (songName) => {
    const url = `https://api.spotify.com/v1/search?q=${songName}&type=track&market=US`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
      // eslint-disable-next-line arrow-parens
    }).then(async (spotifyServerResponse) => {
      const parsedResponse = await spotifyServerResponse.json();
      const items = parsedResponse.tracks.items ?? undefined;
      const tracks = [];
      //create array of track info(name, artists, img)
      for(let i = 0; i < items.length; i++){
        let track = items[i];
        let a = track.artists;
        let artists = [];
        //create array with proper display of artists
        for(let j = 0; j < a.length; j++){
          if(j > 0){
            if(j === a.length - 1){
              if(a.length === 2){
                artists.push(' and ', a[j].name)
              }
              else{
                artists.push(', and ', a[j].name)
              }
            }
            else{
              artists.push(', ', a[j].name)
            }
          }
          else{
            artists.push(a[j].name);
          }
        }
        tracks.push({
          name: track.name,
          artists: artists,
          image: track.album.images[0].url,
          id: track.id,
        });
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
      {songs.length === 0 && 
        <div className="site-description">search for songs. leave a review. share with friends.</div>
      }
      <div className="Dropdown-container">
      {songs.map((song) => (
        <div>
          <button type="button" onClick={async () => {
            setSongComponent(
            <Song
              name={song.name}
              artists={song.artists}
              image={song.image}
              id={song.id}
              token={props.token}
            />
            )
            console.log(song);
          }}>
            {song.name} by {song.artists}
          </button>
        </div>
      ))}
      </div>
      {songComponent !== undefined &&
        <div>{songComponent}</div>
      }
    </div>
  );
};

export default SearchBar;
