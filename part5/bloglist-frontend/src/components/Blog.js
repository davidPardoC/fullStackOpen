import { useState } from "react";
import { useRef } from "react";
import "./Blog.css";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const toggleRef = useRef(null);
  const toggle = () => {
    toggleRef.current.toggleVisisble();
    setVisible(!toggleRef.current.visible);
  };
  return (
    <div className="blog">
      <div>
        {blog.title}{" "}
        <button onClick={toggle}>{visible ? "hide" : "show"}</button>
      </div>
      <Togglable ref={toggleRef} showButton={false}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button>like</button>
          </div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
