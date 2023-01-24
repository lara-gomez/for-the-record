import React, { useState } from "react";

import "./SearchBar.css";
import "../../utilities.css";

// import {getCred} from '../../../../server/spotify.js';
// import {getTracks} from '../../../../server/spotify.js';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
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
    setSearchInput("");
  };

  return (
    <div className="u-textCenter SearchBar-position">
      <input
        type="search"
        name="q"
        placeholder="Search Song Here"
        onChange={handleChange}
        className="SearchBar-input"
        size="50"
        required
      />
      <button type="submit" className="SearchBar-button u-pointer" value="Submit">
        Submit
      </button>
    </div>
  );
};

export default SearchBar;
