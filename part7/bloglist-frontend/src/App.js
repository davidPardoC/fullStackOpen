import { useRef } from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogToggleRef = useRef(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    setUser(user)
    if (user) {
      blogService.setToken(user.token)
      getBlogs()
    }
  }, [])

  const onLogin = (user) => {
    setUser(user)
    blogService.setToken(user.token)
    getBlogs()
  }

  const getBlogs = () => {
    blogService.getAll().then((blogs) => {
      const sorted = blogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1
        }
        return 1
      })
      setBlogs(sorted)
    })
  }

  const onAddedBlog = (blog) => {
    setBlogs(blogs.concat([blog]))
    blogToggleRef.current.toggleVisisble()
  }

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <>
          <h2>Blogs</h2>
          <UserInfo user={user} />
          <Togglable ref={blogToggleRef} label="Add Blog">
            <BlogForm onSuccess={onAddedBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog onDelete={getBlogs} key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
