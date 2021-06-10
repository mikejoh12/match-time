import axios from 'axios'

const apiAxios = axios.create({
    baseURL: '/api'
})

export default apiAxios