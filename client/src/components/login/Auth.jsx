import React from 'react'
import './Auth.css'
import AuthForm from './AuthForm'
import { UserContext } from '../../context/UserProvider'


export default function Auth(){
const {signup, login, resetAuthErr, errMsg }= React.useContext(UserContext)

//loginform initial input state
const initInputs = {
    username: '',
    password:'', 
    email: ''
}

//login state 
const [inputs, setInputs] = React.useState(initInputs)

//alredy member state
const [toggle, setToggle] = React.useState(false)

//controlled inputs 
function handleChange(e){
    const {name,value} = e.target
    setInputs(previnputs=>({
        ...previnputs,
        [name] : value 
    }))
}

//signup
function handleSignup(e){
    e.preventDefault()
    signup(inputs)
}

//login 
function handleLogin(e){
e.preventDefault()
login(inputs)
}

//toggle
function toggleForm(){
    setToggle(prev=> !prev)
    resetAuthErr()
}

    
    return(
        <div className='auth-container'>
        {!toggle ?
        <>
        <AuthForm
        handleChange={handleChange}
        handleSubmit={handleSignup}
        inputs={inputs}
        btnTxt = "Sign Up"
        errMsg={errMsg}
        />
        <h4 onClick={toggleForm} className='member'>Already A Member ?</h4>
        </>
        :
        <>
        <AuthForm
        handleChange={handleChange}
        handleSubmit={handleLogin}
        inputs={inputs}
        btnTxt = "Login"
        errMsg={errMsg}
        />
        <h4 onClick={toggleForm}  className='member1'> Not a Member ?</h4>
        </>
        }
    </div>
    )
}