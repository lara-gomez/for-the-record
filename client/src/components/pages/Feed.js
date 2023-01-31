import React, { useState, useEffect } from "react";
import SearchBar from "../modules/SearchBar.js";

import "../../utilities.css";
import "./Feed.css";

const Feed = (props) => {
    return(
        <div>
            <SearchBar loggedIn={true}/>
        </div>
    );
};

export default Feed;