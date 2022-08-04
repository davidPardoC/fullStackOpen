const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body
  if (password.length < 3) {
    return res.status(400).json({ message: 'Invalid Password' })
  }
  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)
  const user = new User({ username, name, password: hashedPassword })
  const newUser = await (await user.save()).toJSON()
  delete newUser.password
  res.json(newUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({}, ['-password']).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  res.json(users)
})

module.exports = userRouter
