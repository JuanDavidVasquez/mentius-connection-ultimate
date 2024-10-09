import axios from 'axios'

export const permisosRoleApi = axios.create({
   baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

