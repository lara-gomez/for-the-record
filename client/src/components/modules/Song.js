import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import "./Song.css";

/**
 * Component that renders song
 *
 * Proptypes
 * @param {String} name is the name of the song
 * @param {String} id
 * @param {Array} artists are the names of the artists
 * @param {String} image is link to track cover
 */
const Song = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const [likeButton, setLikeButton] = useState("Like");
    const [likes, setLikes] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [seeReviews, setSeeReviews] = useState(false);

    useEffect(() => {
        console.log(props.id);
        get("/api/song", {song_id: props.id}).then((songObj) => {
            setLikes(songObj.likes);
            const review_ids = songObj.reviews;
            let revs = [];
            for(let i = 0; i < review_ids.length; i++){
                get("/api/review", {id : review_ids[i]}).then((review) => {
                    revs.push(review);
                });
            }
            setReviews(revs);
            if(songObj.likedBy.includes(props.userId)){
                setLikeButton("Dislike");
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
        setSearchInput("");
    }
  };

  const setRevs = () => {
    if(seeReviews === false){
        setSeeReviews(true);
    }
    else{
        setSeeReviews(false);
    }
  };

  const like = (e) => {
    if(likeButton === "Like"){
        setLikeButton("Dislike");
        setLikes(likes + 1);
        const body = {song_id: props.id, user_id: props.userId, like: true};
        post("/api/like", body);
    }
    else{
        setLikeButton("Like");
        setLikes(likes - 1);
        const body = {song_id: props.id, user_id: props.userId, like: false};
        post("/api/like", body);
    }
  };

    return(
        <div>
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <h1>{props.artists}</h1>
            <div> 
                <span>
                    <button type="submit" onClick={like}>{likeButton}</button>
                    <div>{likes}</div>
                </span>
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
                ))}
                <span>
                    <button type="button" className="SearchBar-button u-pointer" onClick={setRevs}>
                        Close Reviews
                    </button>
                </span>
                {props.token && (
                    <>
                    <input
                    type="input"
                    placeholder="Leave Review"
                    onChange={handleChange}
                    className="SearchBar-input"
                    size="50"
                    required
                    />
                    <button type="button" onClick={handleSubmit}>Submit</button>
                    </>
                )}
                </>
            )}
            </div>
        </div>
    );
};

export default Song;