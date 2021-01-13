import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AdminUsersTable from './AdminUsersTable';

const AdminAllUsers = () => {

    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(true);
    const auth = useContext(AuthContext)
    const history = useHistory();
    useEffect(() => {

            fetch(`http://localhost:5000/admin/users`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${auth.token}`,
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())

                .then(res => {
                    setUsers(res)
                })
                .catch(() => history.push('/*'));

    }, [auth,update,history])

    return (<AdminUsersTable users={users} token={auth.token} setUpdate={setUpdate}/>)

 }

export default AdminAllUsers;