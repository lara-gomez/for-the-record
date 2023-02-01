const mongoose = require("mongoose");
const { internalIP } = require("webpack-dev-server");

const SongSchema = new mongoose.Schema({
  id: String,
  likes: Number,
  reviews: [String],
});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);
