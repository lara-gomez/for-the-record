import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import "./Song.css";

/**
 * Component that renders song
 *
 * Proptypes
 * @param {String} name is the name of the song
 * @param {String} id
 * @param {String} artists are the names of the artists
 * @param {String} image is link to track cover
 */
const Song = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [likes, setLikes] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [seeReviews, setSeeReviews] = useState(false);

    // const setSong = (async() => {
    //     const userObj = await get("/spotify/api/song", {song_id: props.id});
    //     console.log(userObj);
    //     setLikes(userObj);
    // });

    useEffect(() => {
        console.log(props.id);
        get("/api/song", { song_id: props.id }).then((songObj) => {
            setLikes(songObj.likes);
            const review_ids = songObj.reviews;
            let revs = [];
            for(let i = 0; i < review_ids.length; i++){

            }
            console.log(songObj);
        });
    }, []);

    //event = user types in search box
    const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  //event = user presses submit
  const handleSubmit = (e) => {
    if(searchInput.length > 0){
        const body = {
            user_id: props.userId, 
            content: searchInput,
            song_id: props.id,
        };
        post("/api/review", body).then((review) => {
            setReviews([review].concat(reviews));
        });
    }
  };

  const setRevs = () => {
    console.log("revs", seeReviews)
    setSeeReviews(true);
  };

    return(
        <div>
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <h1>{props.artists}</h1>
            <div> 
                <span>{likes} Likes </span>
            {!seeReviews ? (
                <span>
                <button type="button" className="SearchBar-button u-pointer" onClick={setRevs}>
                    See Reviews
                </button>
                </span>
            ) : (
                <>
                {reviews.map((rev) => (
                    <div>{rev.content} | {rev.creator_id}</div> 
                ))};
                <input
                type="search"
                placeholder="Leave Review"
                onChange={handleChange}
                className="SearchBar-input"
                size="50"
                required
                />
                <button type="button" onClick={handleSubmit}>Submit</button>
                </>
            )}
            </div>
        </div>
    );
};

export default Song;