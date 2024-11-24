import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5001/api', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
