/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// Spotify API methods

let access_token = ""; // initiate access token
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback_uri = "http://localhost:5050/api/spotify/callback";
/**
 * Generates a secure random token (https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js)
 */
function generateRandomString() {
  require("crypto").randomBytes(48, function (err, buffer) {
    return buffer.toString("hex");
  });
}

/**
 * API endpoint for pulling up the spotify login page. If the page doesn't pull up its probably because your browser remembers ur login session.
 * If you need to see the Spotify login page for testing purposes use an incognito window, it will forget all your browser data.
 */
router.get("/spotify/login", (req, res) => {
  var scope =
    "streaming \
                 user-read-email \
                 user-read-private";

  const state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: callback_uri, // make sure that this is your FRONTEND! localhost:5050 points to the front end not backend for me
    state: state,
  });

  res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
});

/**
 * This is the callback function that runs after a user logs in through the spotify login page. It will fetch an access token from the Spotify servers.
 */
router.get("/spotify/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: callback_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " + Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString("base64"),
      "Content-Type": "routerlication/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token; // this is the access token that you will use to send to the Spotify API anytime you send them an API call.
      res.redirect("/"); // sends user back to the home page after a token is fetched. Up to you to change this to whatever path you want.
    }
  });
});

/**
 * Called as soon as someone opens up localhost:5050/spotifyPage in order to check if there is an access token available on the server.
 * You can use this to render different things and check if someone has logged in on the front end.
 */
router.get("/spotify/token", (req, res) => {
  console.log("token page");
  res.json({
    access_token: access_token,
  });
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
