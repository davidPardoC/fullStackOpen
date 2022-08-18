const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});
const AuthorModel = mongoose.model("Author", schema);
module.exports = AuthorModel;
