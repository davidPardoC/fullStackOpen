import axios from "axios";
const baseUrl = "/api/blogs";

let privateToken = "";

const setToken = (token) => {
  privateToken = token;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBog = async (blog) => {
  const { data } = await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${privateToken}` },
  });
  return data;
};

const updateBlog = async (blog) => {
  const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return data;
};

const removeBlog = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${privateToken}` },
  });
  return data;
};

const blogService = { getAll, createBog, setToken, updateBlog, removeBlog };

export default blogService;
