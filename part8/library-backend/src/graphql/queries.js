const BookModel = require("../Models/Book.model");
const UserModel = require("../Models/User.model");

const allBooks = async (root, args) => {
  const { author } = args;
  if (author) {
    const books = await BookModel.find({ author });
    return books;
  }
  const books = await BookModel.find();
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
