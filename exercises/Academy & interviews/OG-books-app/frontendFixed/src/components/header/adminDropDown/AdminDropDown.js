import React, { useContext } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext.js'
import './AdminDropDown.css'


const AdminDropDown = () => {
    const history = useHistory()
    const auth = useContext(AuthContext);
    return (
        <>
            {(auth.user && auth.user.role === 'admin') && <DropdownButton variant="success" className='Admin_Drop_Down' id="dropdown-basic-button" title="Admin options">
                <Dropdown.Item onClick={() => history.push('/admin/books')}>All books</Dropdown.Item>
                <Dropdown.Item onClick={() => history.push('/admin/users')}>All users</Dropdown.Item>
                <Dropdown.Item onClick={() => history.push('/admin/books/create')}>Create book</Dropdown.Item>
            </DropdownButton>
            }
        </>
    )
}

export default AdminDropDown