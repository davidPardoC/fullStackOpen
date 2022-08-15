import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../../reducers/blogsReducer'
import { setUser } from '../../reducers/userReducer'
import blogService from '../../services/blogs'
import Blog from '../Blog/Blog'
import BlogForm from '../BlogForm/BlogForm'
import Togglable from '../Togglable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogToggleRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    if (user) {
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [])

  const onAddedBlog = () => {
    blogToggleRef.current.toggleVisisble()
  }
  return (
    <div>
      <>
        <h2>Blogs</h2>
        <Togglable ref={blogToggleRef} label="Add Blog">
          <BlogForm onSuccess={onAddedBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    </div>
  )
}

export default BlogList
