import axios from 'axios'
const baseUrl = 'http://localhost:3003'

axios.defaults.baseURL = baseUrl

const getAll = async () => {
  const { data } = await axios.get('/api/users')
  return data
}

/**
 *
 * @param {String} id userId
 * @returns
 */
const getUser = async (id) => {
  const { data } = await axios.get(`/api/users/${id}`)
  return data
}

const usersServices = { getAll, getUser }

export default usersServices
