const { default: axios } = require("axios");

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const addPerson = async (person) => {
  const req = await axios.post(baseUrl, person);
  return req.data;
};

const deletePerson = async (id) => {
  const req = await axios.delete(`${baseUrl}/${id}`);
  return req.data;
};

const updatePerson = async (id, person) => {
  const req = await axios.put(`${baseUrl}/${id}`, person);
  return req.data;
};

const personServices = { getAll, addPerson, deletePerson, updatePerson };

export default personServices;
