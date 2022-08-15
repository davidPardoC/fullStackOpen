import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usersServices from '../../services/users'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    usersServices.getUser(id).then((data) => setUser(data))
  }, [])

  return user ? (
    <>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  ) : (
    <p>Loading ...</p>
  )
}

export default User
