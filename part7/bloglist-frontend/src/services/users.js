import axios from 'axios'
const baseUrl = 'http://localhost:3003'

axios.defaults.baseURL = baseUrl

const getAll = async () => {
  const { data } = await axios.get('/api/users')
  return data
}

const usersServices = { getAll }

export default usersServices
