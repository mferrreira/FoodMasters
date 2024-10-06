import  axios  from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
})

export default api