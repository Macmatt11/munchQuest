import React from "react"
import NavLinks from "./NavLinks"
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineCloseCircle} from "react-icons/ai"
import './navbar.css'


export default function Navbar2(props){
const {logout} = props
const [open, setOpen] = React.useState(false)

const hamburgerIcon = <RxHamburgerMenu 
            className="hamburger" 
            size="40px" 
            color="white"
            onClick={()=>setOpen(!open)} />

const closeIcon = <AiOutlineCloseCircle
            className="closeIcon" 
            size="40px" 
            color="red"
            onClick={()=>setOpen(!open)} />


    return(
        <nav className="mainNav">
            <h1 className='navTitle'>MunchQuest</h1>
            {open? closeIcon : hamburgerIcon}
            {open && <NavLinks logout={logout}/>}
        </nav>
    )
}