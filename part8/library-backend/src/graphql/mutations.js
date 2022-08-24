const { UserInputError, AuthenticationError } = require("apollo-server");
const AuthorModel = require("../Models/Author.model");
const BookModel = require("../Models/Book.model");
const UserModel = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config/config");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const addBook = async (root, args, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("not authenticated");
  }
  try {
    let author = await AuthorModel.findOne({ name: args.author });
    if (!author) {
      const newAuthor = new AuthorModel({ name: args.author });
      author = await newAuthor.save();
    }
    const book = new BookModel({ ...args, author: author._id });
    const newBook = await book.save();
    return newBook;
  } catch (error) {
    throw new UserInputError(error.name, error);
  }
};

const editAuthor = async (root, args, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("not authenticated");
  }
  try {
    const { name, setBornTo } = args;
    const author = await AuthorModel.findOne({ name });
    author.born = setBornTo;
    const newAuthor = await author.save();
    return newAuthor;
  } catch (error) {
    throw new UserInputError(error.name, error);
  }
};

const addAuthor = async (root, args) => {
  const author = new AuthorModel(args);
  try {
    return await author.save();
  } catch (error) {
    throw new UserInputError(error.name, error);
  }
};

const addUser = async (roott, args) => {
  try {
    const user = new UserModel(args);
    return user.save();
  } catch (error) {
    throw new UserInputError(error.name, error);
  }
};

const login = async (root, args, context) => {
  const { username } = args;
  const me = await UserModel.findOne({ username });
  if (!me) {
    throw new AuthenticationError();
  }
  return { value: jwt.sign(me.toJSON(), tokenSecret) };
};

module.exports = { addBook, editAuthor, addAuthor, addUser, login };
