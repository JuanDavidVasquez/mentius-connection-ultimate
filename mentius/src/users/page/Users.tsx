
import { UserSearch } from '../components/UserSearch'
import '../assets/userStyles.css'
import { useEffect, useState } from 'react';
import { User } from '../components/User';
import { UserEdit } from '../components/UserEdit';

import { getUsers } from '../../store/users/index';
import { useDispatch, useSelector } from 'react-redux';





export const Users = () => {
    const [createUserToggle, setCreateUserToggle] = useState<boolean>(false);
    const [editUserToggle, setEditUserToggle] = useState<boolean>(false);

    const handleToggleCreate = () => {
        setCreateUserToggle(!createUserToggle);
    };


    const dispatch = useDispatch();

    const { user } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        setEditUserToggle(true);
    }, [user]);



  return (
    <>
        <h1>Users</h1>
        <main className='mainUser'>
        <section className='user-details-section section-users'>
            <button 
                className='btn success'
                onClick={handleToggleCreate}
                >
                    Create User</button>
                    
                {createUserToggle && <User/>}
            </section>
            <section className='search-user-section'>
                <UserSearch/>               
            </section>
          
            <section className='user-edit-section section-users'>
                    {editUserToggle && <UserEdit/>}         
            </section>
        </main>
    </>
  )
}

export default Users