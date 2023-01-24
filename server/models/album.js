const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  _id: String,
  artist: String,
  title: String,
  cover: {
    type: String,
    default: null,
  },
});

// compile model from schema
module.exports = mongoose.model("album", AlbumSchema);
