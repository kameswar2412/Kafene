import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { LoginStatus } from '../../../../redux/actions/action'
import './login.css'

export const Login = (props) => {

const [userName,setUserName]=useState("")
const [password,setPassword]=useState("")
const history=useHistory()

const handleLogIn=(e)=>{

    e.preventDefault()
    // console.log(userName,password)
    if (userName === password) {
        alert("Login successfuly!!");
        localStorage.setItem("logInStatus",JSON.stringify(true))
        props.logStatus(true)
        history.push('orderslist')
        setUserName("")
        setPassword("")
      } else {
        alert(" Please enter valid credentials! ");
        localStorage.setItem("logInStatus",JSON.stringify(false))
        props.logStatus(false)


      }

}

    return (
    <>
     <section id="form-section">
        <form onSubmit={handleLogIn} id="form">

          <h1 className="form-heading">Sign In</h1>

          <input id="username" className="form-input" type="text" required
          
          value={userName} onChange={(e)=> setUserName(e.target.value)}

          placeholder="Enter Username" minLength="3" autoFocus />

          <input id="pass" className="form-input" type="password" required
          
          value={password} onChange={(e)=> setPassword(e.target.value)}

          placeholder="Enter Password" minLength="3" autoComplete="none" />

          <input id="form-btn" type="submit" value="LogIn" />

        </form>
      </section>
     </>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps =(dispatch)=>({
    logStatus:(payload)=>dispatch(LoginStatus(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
