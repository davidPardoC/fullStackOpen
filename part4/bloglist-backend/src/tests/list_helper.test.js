const listHelper = require('../utils/list_helper')
const { blogsStub } = require('./stubs/bloglist.stub')
describe('Dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogsStub[0]]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(blogsStub[0].likes)
  })
  test('of a bigger list is calculated rigth', () => {
    const result = listHelper.totalLikes(blogsStub)
    expect(result).toBe(36)
  })
})
