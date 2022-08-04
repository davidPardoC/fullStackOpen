const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body
  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)
  const user = new User({ username, name, password: hashedPassword })
  const newUser = await (await user.save()).toJSON()
  delete newUser.password
  res.json(newUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({}, ['-password'])
  res.json(users)
})

module.exports = userRouter
