import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { AuthContext } from '../../../contexts/AuthContext';

const BanOptions = ({ token, userId, setUpdate }) => {

    const [reason, setReason] = useState('Ban reasons');
    const auth = useContext(AuthContext)

    const banUser = (reason) => {
        if (reason !== 'Ban reasons') {
            if (userId === auth.user.sub) {
                alert('You cant ban yourself')
                return
            }
            fetch(`http://localhost:5000/admin/users/${userId}/banstatus`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reason: reason })
                }
            )
                .then(res => res.json())

                .then(res => {
                    setUpdate(prev => !prev);
                })
                .catch((err) => alert(err));
        }
        else { alert('You must choose reason for the ban!') }
    }
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                        {reason}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => { setReason('Bad behaviour'); popupState.close(); }}>Bad behaviour</MenuItem>
                        <MenuItem onClick={() => { setReason('Cheating'); popupState.close(); }}>Cheating</MenuItem>
                        <MenuItem onClick={() => { setReason('Bad username'); popupState.close(); }}>Bad username</MenuItem>
                        <MenuItem onClick={() => { setReason('Bad display name'); popupState.close(); }}>Bad display name</MenuItem>
                        <MenuItem onClick={() => { setReason('Damaged a book'); popupState.close(); }}>Damaged a book</MenuItem>
                        <MenuItem onClick={() => { setReason('Tapanar'); popupState.close(); }}>Tapanar</MenuItem>

                    </Menu>
                    <Button variant="contained" color="secondary" onClick={() => banUser(reason)}>Ban
                        </Button>
                </React.Fragment>
            )}
        </PopupState>
    );
}
export default BanOptions




