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

const favoriteBlog = (blogs = []) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLikes = Math.max(...likes)
  const index = blogs.findIndex((blog) => blog.likes === maxLikes)
  return blogs[index]
}

const mostBlogs = (blogs = []) => {
  let mostBlogsAuthor = { blogs: 0, author: blogs[0].author || '' }
  blogs.forEach((blog) => {
    if (blog.author === mostBlogsAuthor.author) {
      mostBlogsAuthor.author = blog.author
      mostBlogsAuthor.blogs = mostBlogsAuthor.blogs + 1
    }
  })
  return mostBlogsAuthor
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
