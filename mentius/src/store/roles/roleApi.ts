import axios from 'axios'

export const roleApi = axios.create({
   baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

