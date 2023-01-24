const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  parent: String,
  review_content: String,
  rating: Number,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
