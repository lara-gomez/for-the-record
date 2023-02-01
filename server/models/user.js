const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotify_id: String,
  refreshToken: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
