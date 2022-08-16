import React from 'react'
import { useState } from 'react'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showNotificationCreator } from '../../reducers/notificationReducer'
import { addBlog } from '../../reducers/blogsReducer'
import { Button } from '@chakra-ui/react'

const BlogForm = ({ onSuccess }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleAuthor = (e) => {
    setAuthor(e.target.value)
  }
  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const blog = { title, author, url }
    try {
      const newBlog = await blogService.createBog(blog)
      dispatch(addBlog(newBlog))
      onSuccess()
      dispatch(showNotificationCreator({ message: `Blog ${title} added!` }))
    } catch (error) {
      const { message } = error
      dispatch(showNotificationCreator({ message, error: true }))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Create New</h3>
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" value={title} onChange={handleTitle} />
      </div>
      <div>
        <label htmlFor="title">Author: </label>
        <input type="text" id="title" value={author} onChange={handleAuthor} />
      </div>
      <div>
        <label htmlFor="title">Url: </label>
        <input type="text" id="title" value={url} onChange={handleUrl} />
      </div>
      <Button colorScheme="facebook">Create</Button>
    </form>
  )
}

BlogForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default BlogForm
