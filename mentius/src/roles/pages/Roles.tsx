import { useState } from "react";
import { RoleCreate } from "../components/RoleCreate";
import { RoleDelete } from "../components/RoleDelete";
import { RoleList } from "../components/RoleList";

export const Roles = () => {
    const [activeModalCreate, setActiveModalCreate] = useState(false);



    return (
        <div className="container-roles">
            <h1>Roles</h1>

            <RoleList />

            <button
                className="btn success"
                onClick={() => setActiveModalCreate(true)}
            >
                Create Role
            </button>

           

            {activeModalCreate && <RoleCreate activeModalCreate={activeModalCreate} onClose={() => setActiveModalCreate(false)} />}
           
        </div>
    );
}

export default Roles;
