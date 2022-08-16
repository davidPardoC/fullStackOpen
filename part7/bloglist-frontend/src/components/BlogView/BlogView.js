import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogs'

const BlogView = () => {
  const [blog, setBlog] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    blogService.getBlog(id).then((data) => setBlog(data))
  }, [])

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
