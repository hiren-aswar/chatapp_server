var mongoose = require("mongoose");
const productschema = new mongoose.Schema({
  room: Number,
});
module.exports = mongoose.model("msgs", productschema);
