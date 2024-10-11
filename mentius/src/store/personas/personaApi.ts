import axios from 'axios'

export const personaApi = axios.create({
   baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

