import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useField } from '../../hooks/useField'
import blogService from '../../services/blogs'

const BlogView = () => {
  const comment = useField('comment')
  const [blog, setBlog] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    blogService.getBlog(id).then((data) => setBlog(data))
  }, [])

  const commentPost = async (e) => {
    e.preventDefault()
    if (comment.value) {
      const newBlog = await blogService.commentBlog(blog.id, comment.value)
      setBlog(newBlog)
    }
  }

  return (
    blog && (
      <div>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes <button>like</button>
        </p>
        <p>Added by {blog.user.name}</p>
        <h4>Comments</h4>
        <form onSubmit={commentPost}>
          <input type="text" {...comment} />
          <button>add commet</button>
        </form>
        <ul>
          {blog.comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      </div>
    )
  )
}

export default BlogView
