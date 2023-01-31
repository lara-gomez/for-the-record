const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotify_id: String,
  // spotify_secret: String,
  // spotify_token: String,
  profile_pic: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
