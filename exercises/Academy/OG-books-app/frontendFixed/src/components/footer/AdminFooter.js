
// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext'
// import './AdminFooter.css'

// const AdminFooter = () => {
//     const auth = useContext(AuthContext);

//     return (
//         <>
//             {(auth.user && auth.user.role === 'admin') && (<div className='footer'>
//                 <Link to='/admin/books' style={{ textDecoration: "none", color: "black" }}>
//                     <div className='footer_about_us'>
//                         <h2>All Books</h2>
//                     </div>
//                 </Link>
//                 <Link to='/admin/users' style={{ textDecoration: "none", color: "black" }}>
//                     <div className='footer_contacts'>
//                         <h2>All Users</h2>
//                     </div>
//                 </Link></div>)}
//         </>
//     )
// }
// export default AdminFooter