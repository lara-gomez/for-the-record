const mongoose = require("mongoose");
const { internalIP } = require("webpack-dev-server");

const SongSchema = new mongoose.Schema({
  _id: String,
  parent: String, //parent is albums
  //likes: integer,
  reviews: Array,
  // album: {
  //   type: String,
  //   ref: "Albums",
  // },
  // title: String,
});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);
