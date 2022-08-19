const mongoDBUri = process.env.MONGODB_URI;
const tokenSecret = process.env.TOKEN_SECRET;

module.exports = { mongoDBUri, tokenSecret };
