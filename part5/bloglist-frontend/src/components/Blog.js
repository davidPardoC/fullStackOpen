import { useState } from "react";
import { useRef } from "react";
import blogService from "../services/blogs";
import "./Blog.css";
import Togglable from "./Togglable";

const Blog = ({ blog: listBlog }) => {
  const [blog, setBlog] = useState(listBlog);
  const [visible, setVisible] = useState(false);
  const toggleRef = useRef(null);
  const toggle = () => {
    toggleRef.current.toggleVisisble();
    setVisible(!toggleRef.current.visible);
  };

  const likePost = async () => {
    const updatedBlog = await blogService.updateBlog({
      ...listBlog,
      likes: listBlog.likes + 1,
    });
    setBlog(updatedBlog);
  };

  return (
    <div className="blog">
      <div>
        {blog.title}
        <button onClick={toggle}>{visible ? "hide" : "show"}</button>
      </div>
      <Togglable ref={toggleRef} showButton={false}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button onClick={likePost}>like</button>
          </div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
