const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }, ['-blogs'])
  if (!user) {
    return res.status(404).send()
  }
  const passwordCorrect = bcrypt.compareSync(password, user.password)
  if (!passwordCorrect) {
    return res
      .status(401)
      .json({ message: 'Username or Password did not match' })
  }
  const userObject = user.toJSON()
  delete userObject.password
  const token = jwt.sign(userObject, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 60,
  })
  res.json({ token })
})

module.exports = loginRouter
