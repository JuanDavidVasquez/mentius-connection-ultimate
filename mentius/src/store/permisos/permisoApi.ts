import axios from 'axios'

export const permisoApi = axios.create({
   baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

