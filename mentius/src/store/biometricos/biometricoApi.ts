import axios from 'axios'

export const biometricoApi = axios.create({
   baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

