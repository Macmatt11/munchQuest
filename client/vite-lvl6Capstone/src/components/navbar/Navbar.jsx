import React from 'react'
import { Link } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {MdPublic,MdSearch,MdRestaurantMenu,MdOutlineAddBox,MdLogout} from 'react-icons/md'
import './navbar.css'



export default function Navbar(props){
    const {logout} = props
    return(
        
        <div className='navbar'>
            <Link className='link'  to= '/locationForm' ><MdSearch/></Link>
            <Link className='link'  to= '/addedRestaurants'><MdRestaurantMenu/></Link>
            <Link className='link'  to = '/public'><MdPublic/></Link>
            <Link className='link'  to = '/profile'><CgProfile/></Link>
            <Link className='link'  to = '/foodPostForm' ><MdOutlineAddBox/></Link>     
            <MdLogout className = "logout-icon" onClick={logout}/>
        </div>
    )
}