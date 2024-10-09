import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPermisoRole } from "../../store/permisosRole/thunk"


const PermisosRole = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPermisoRole())
    }, [])

  return (
    <div>
      <h1>Permisos Role</h1>
    </div>
  )
}

export default PermisosRole
