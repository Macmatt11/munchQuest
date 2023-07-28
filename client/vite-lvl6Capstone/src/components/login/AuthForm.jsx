import React from 'react'

export default function AuthForm(props){
    const {
        handleChange,
        handleSubmit,
        btnTxt,
        errMsg,
        inputs:{
            username,
            password,
            email
        }} = props
    return(
        <form onSubmit={handleSubmit} className="authForm">
            <h1 className='loginTitle'>MunchQuest</h1>
            <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className='login-inputs'
            />
            <input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className='login-inputs'
            />
            <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className='login-inputs'
            />
            <button className='login-btn'>{btnTxt}</button>
            <p style={{color: 'red'}} className="errMsg">{errMsg}</p>
        </form>
    )
}