var mongoose = require("mongoose");
const productschemas = new mongoose.Schema({
  msg: String,
  room: Number,
  Auther: String,
});
module.exports = mongoose.model("message", productschemas);
