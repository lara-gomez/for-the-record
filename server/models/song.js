const mongoose = require("mongoose");
const { internalIP } = require("webpack-dev-server");

const SongSchema = new mongoose.Schema({
  song_id: String,
  likes: Number,
  likedBy: [String],
  reviews: [String]
});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);
