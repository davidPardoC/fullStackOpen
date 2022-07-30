const dummy = (blogs = []) => {
  if (blogs.length === 0) {
    return 1
  }
}

const totalLikes = (blogs = []) => {
  if (blogs.length === 0) {
    return 0
  }
  if (blogs.length === 1) {
    return blogs[0].likes
  }
  const reducer = (prevValue, currentValue) => prevValue + currentValue
  const result = blogs.map((blog) => blog.likes).reduce(reducer, 0)
  return result
}

module.exports = { dummy, totalLikes }
