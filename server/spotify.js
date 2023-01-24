/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const request = require("request");
const dotenv = require("dotenv");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
let access_token = ""; // initiate access token

/**
 * Generates a secure random token (https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js)
 */
function generateRandomString() {
  require("crypto").randomBytes(48, function (err, buffer) {
    return buffer.toString("hex");
  });
}

router.get("/login", (req, res) => {
  var scope =
    "streaming \
                 user-read-email \
                 user-read-private";

  const state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://localhost:5050/api/auth/callback",
    state: state,
  });

  res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
});

router.get("/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: "http://localhost:5050/api//callback",
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
      access_token = body.access_token;
      res.redirect("/");
    }
  });
});

router.get("/token", (req, res) => {
  console.log("token page");
  res.json({
    access_token: access_token,
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
