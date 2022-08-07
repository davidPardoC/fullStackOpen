import { useRef } from "react";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserInfo from "./components/UserInfo";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogToggleRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userLogged"));
    setUser(user);
    if (user) {
      blogService.setToken(user.token);
      getBlogs();
    }
  }, []);

  const onLogin = (user) => {
    setUser(user);
    blogService.setToken(user.token);
    getBlogs();
  };

  const getBlogs = () => {
    blogService.getAll().then((blogs) => {
      const sorted = blogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        }
        return 1;
      });
      setBlogs(sorted);
    });
  };

  const onAddedBlog = (blog) => {
    setNotification({
      error: false,
      message: `a new blog ${blog.title} added`,
    });
    setBlogs(blogs.concat([blog]));
    blogToggleRef.current.toggleVisisble();
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  const onAddBlogError = (error) => {
    setNotification({
      error: true,
      message: error.response.data.message || error.message,
    });
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  const onLoginError = (error) => {
    setNotification({
      error: true,
      message: error.response.data.message || error.message,
    });
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {!user ? (
        <LoginForm onLogin={onLogin} onError={onLoginError} />
      ) : (
        <>
          <h2>Blogs</h2>
          <UserInfo user={user} />
          <Togglable ref={blogToggleRef} label="Add Blog">
            <BlogForm onSuccess={onAddedBlog} onError={onAddBlogError} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
