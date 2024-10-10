import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPermisoRole } from "../../store/permisosRole/thunk"
import { PermisoRoleCreate } from "../components/PermisoRoleCreate"
import { getPermisos } from "../../store/permisos/thunk"
import { getRoles } from "../../store/roles/thunk"


const PermisosRole = () => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPermisoRole());
        dispatch(getPermisos());
        dispatch(getRoles());
    }, [])

  return (
    <>
      <h1>Permisos Role</h1>
      <div className="container-asignacion-permisoRole">
        <PermisoRoleCreate />
      </div>
    </>
  )
}

export default PermisosRole
