import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog/Blog'
import BlogForm from './components/BlogForm/BlogForm'
import LoginForm from './components/LoginForm/LoginForm'
import Notification from './components/Notification/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogToggleRef = useRef(null)

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
      <Notification />
      {!user.isLoggedIn ? (
        <LoginForm />
      ) : (
        <>
          <h2>Blogs</h2>
          <UserInfo user={user} />
          <Togglable ref={blogToggleRef} label="Add Blog">
            <BlogForm onSuccess={onAddedBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
