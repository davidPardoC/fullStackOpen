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
import { Box, Button, Flex } from '@chakra-ui/react'

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
    <Box p={2} margin={2} borderRadius={4} boxShadow="1px 1px 3px #000000">
      <Flex justifyContent="space-between">
        <div className="blogHeader">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <div>{blog.author}</div>
        </div>

        <Button colorScheme="blackAlpha" onClick={toggle}>
          {visible ? 'hide' : 'show'}
        </Button>
      </Flex>
      <Togglable ref={toggleRef} showButton={false}>
        <Flex flexDirection={'column'} alignItems="flex-start">
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{' '}
            <Button margin={1} onClick={likePost}>
              like
            </Button>
          </div>
          <Button colorScheme="red" onClick={deletePost}>
            Remove
          </Button>
        </Flex>
      </Togglable>
    </Box>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
