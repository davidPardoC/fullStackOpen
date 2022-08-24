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
  books: { type: [mongoose.Schema.Types.ObjectId], ref: "Book" },
});

const AuthorModel = mongoose.model("Author", schema);
module.exports = AuthorModel;
