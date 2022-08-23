const AuthorModel = require("../Models/Author.model");
const BookModel = require("../Models/Book.model");

const allBooks = async (root, args) => {
  const { author, genre } = args;
  if (author) {
    const books = await BookModel.find({ author }).populate("author");
    return books;
  }
  if (genre) {
    const books = await BookModel.find({ genres: [genre] }).populate("author");
    return books;
  }
  const books = await BookModel.find().populate("author");
  return books;
};

const bookCount = async () => {
  return await BookModel.countDocuments();
};

const authorCount = async () => await AuthorModel.countDocuments();

const allAuthors = async () => {
  const books = await AuthorModel.find();
  return books;
};

const me = async (root, args, context) => {
  return context.currentUser;
};

module.exports = { allBooks, bookCount, authorCount, allAuthors, me };
