import { useState } from 'react'
import { useRef } from 'react'
import blogService from '../../services/blogs'
import './Blog.css'
import Togglable from '../Togglable'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showNotificationCreator } from '../../reducers/notificationReducer'
import { initializeBlogs } from '../../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog: listBlog }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(listBlog)
  const [visible, setVisible] = useState(false)

  const toggleRef = useRef(null)

  const toggle = () => {
    toggleRef.current.toggleVisisble()
    setVisible(!toggleRef.current.visible)
  }

  const likePost = async () => {
    const updatedBlog = await blogService.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
    setBlog(updatedBlog)
  }

  const deletePost = async () => {
    const shouldDeleteBlog = window.confirm(`Remove blog ${blog.title} ?`)
    if (shouldDeleteBlog) {
      try {
        await blogService.removeBlog(blog.id)
        dispatch(showNotificationCreator({ message: 'Blog deleted' }))
        dispatch(initializeBlogs())
      } catch (error) {
        const { message } = error
        dispatch(showNotificationCreator({ message, error: true }))
      }
    }
  }

  return (
    <div className="blog">
      <div>
        <div className="blogHeader">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <div>{blog.author}</div>
        </div>

        <button onClick={toggle}>{visible ? 'hide' : 'show'}</button>
      </div>
      <Togglable ref={toggleRef} showButton={false}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button onClick={likePost}>like</button>
          </div>
          <button onClick={deletePost}>Remove</button>
        </div>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
