import React, { useState, useEffect } from "react";
import SearchBar from "../modules/SearchBar.js";

import "../../utilities.css";
import "./Feed.css";

const Feed = (props) => {
    return(
        <div>
            <SearchBar token={props.token} userId={props.userId} />
        </div>
    );
};

export default Feed;