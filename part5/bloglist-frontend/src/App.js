import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userLogged"));
    setUser(user);
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const onLogin = (user) => {
    setUser(user);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <>
          <h2>Blogs</h2>
          <UserInfo user={user} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
