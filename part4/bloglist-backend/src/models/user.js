const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true, required: true, minLength: 3 },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

module.exports = mongoose.model('User', userSchema)
