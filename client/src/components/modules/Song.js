import React from "react";
import "./Song.css";

/**
 * Component that renders song
 *
 * Proptypes
 * @param {String} name is the name of the song
 * @param {String} artists are the names of the artists
 * @param {String} image is link to track cover
 */
const Song = (props) => {
    return(
        <div>
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <h1>{props.artists}</h1>
        </div>
    );
};

export default Song;