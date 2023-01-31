const { isInteger } = require("core-js/core/number");
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  creator_id: String,
  content: String,
  //likes: ,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
