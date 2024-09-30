
import { UserSearch } from '../components/UserSearch'
import '../assets/userStyles.css'
import { useState } from 'react';
import { User } from '../components/User';
import { UserEdit } from '../components/UserEdit';


export const Users = () => {
    const [createUserToggle, setCreateUserToggle] = useState<boolean>(false);
    const [editUserToggle, setEditUserToggle] = useState<boolean>(false);

    const handleToggleCreate = () => {
        setCreateUserToggle(!createUserToggle);
    };
    const handleToggleEdit = () => {
        setEditUserToggle(!editUserToggle);
    }


  return (
    <>
        <h1>Users</h1>

        <main className='mainUser'>
            <section className='search-user-section'>
                <UserSearch/>               
            </section>
            <section className='user-details-section section-users'>
            <button 
                className='btn success'
                onClick={handleToggleCreate}
                >
                    Create User</button>
                    
                {createUserToggle && <User/>}
            </section>
            <section className='user-edit-section section-users'>
                <button className='btn success' onClick={handleToggleEdit}>Edit User</button>
                {editUserToggle && <UserEdit/>}               
            </section>
        </main>

    </>
  )
}

export default Users