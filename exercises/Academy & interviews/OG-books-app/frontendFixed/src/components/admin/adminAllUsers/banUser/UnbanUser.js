import React from 'react';
import { Button } from '@material-ui/core';

const UnbanUser = ({ token, userId, setUpdate }) => {

    const unbanUser = () => {

        fetch(`http://localhost:5000/admin/users/${userId}/banstatus`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())

            .then(res => {
                setUpdate(prev => !prev);
            })
            .catch((err) => alert(err));

    }

    return (<Button variant="contained" color="secondary" onClick={unbanUser}>
        Unban
    </Button>)
}
export default UnbanUser;