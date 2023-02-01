const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  creator_id: String,
  content: String,
  parent: String,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
