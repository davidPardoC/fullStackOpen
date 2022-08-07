import { useState } from 'react'
import { useRef } from 'react'
import blogService from '../services/blogs'
import './Blog.css'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog: listBlog, onDelete }) => {
  const [blog, setBlog] = useState(listBlog)
  const [visible, setVisible] = useState(false)
  const toggleRef = useRef(null)
  const toggle = () => {
    toggleRef.current.toggleVisisble()
    setVisible(!toggleRef.current.visible)
  }

  const likePost = async () => {
    const updatedBlog = await blogService.updateBlog({
      ...listBlog,
      likes: listBlog.likes + 1,
    })
    setBlog(updatedBlog)
  }

  const deletePost = async () => {
    const shouldDeleteBlog = window.confirm(`Remove blog ${blog.title} ?`)
    if (shouldDeleteBlog) {
      await blogService.removeBlog(blog.id)
      onDelete()
    }
  }

  return (
    <div className="blog">
      <div>
        <div className="blogHeader">
          <div>{blog.title}</div>
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
  onDelete: PropTypes.func.isRequired,
}

export default Blog
