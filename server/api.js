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

const request = require("request");
const dotenv = require("dotenv");

//initialize socket
const socketManager = require("./server-socket");

dotenv.config();

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

// ---------- SPOTIFY STUFF DOWN HERE -> ONLY SUPPORTS ONE USER at the moment.
// TODO:  - Store user's tokens on the database to support multiple users.
//        - Add functionality to get new tokens when they run out.
//        - We can talk about these other tasks more if you need help. Make a piazza post or come to office hours.

// Go to https://developer.spotify.com/dashboard/ and add this as a callback url "http://localhost:[YOUR FRONTEND PORT]/api/spotify/callback"
// In this example, my frontend port is 5050. It may be yours as well since i just used the default weblab skeleton.

let access_token = ""; // initiate access token
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const callback_uri = "https://fortherecord.herokuapp.com/api/spotify/callback";
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
      setCredentials(access_token);
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

//logging in stuff
// router.post("/setuser", (req, res) => {
//   setCredentials(req.token);
// });

function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ spotify_id: user.spotify_id }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.display_name,
      spotify_id: user.id,
      profile_pic: user.images,
    });

    return newUser.save();
  });
}

const setCredentials = (token) => {
  const url = `https://api.spotify.com/v1/me`
  const credentials = fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    // eslint-disable-next-line arrow-parens
  }).then((response) => {
    return response.json();
  }).then((credentials) => {
    console.log(credentials);
    userObj = {
      display_name: credentials.display_name,
      id: credentials.id,
      images: credentials.images,
    };
    console.log(userObj);
    getOrCreateUser(userObj);
  })
};

// anything else falls to this "not found" case

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
