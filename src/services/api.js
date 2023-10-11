import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api

