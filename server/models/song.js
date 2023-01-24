const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  _id: String,
  parent: String, //parent is albums
  album: {
    type: String,
    ref: "Albums",
  },
  title: String,
});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);
