import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'


export default function NavLinks(props){
    const{logout}=props
    return(
    <ul className='ul'>
        <li>
            <Link className='link2'  to= '/locationForm' >Find Food</Link>
        </li>
        <li>
            <Link className='link2'  to= '/addedRestaurants'>Saved Spots</Link>
        </li>
        <li>
            <Link className='link2' to = '/public'>Public</Link>
        </li>
        <li>
            <Link className='link2'  to = '/profile'>Profile</Link>
        </li>
        <li>
            <Link className='link2'  to = '/foodPostForm' >Create Post</Link>
        </li>
        <li>
            <h4 className = "link2" onClick={logout}>
                Logout
            </h4>
            
        </li>
    </ul>
    )
}