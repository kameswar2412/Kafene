import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { LoginStatus } from '../../redux/actions/action'
import "./header.css"
import { useHistory } from 'react-router'

export const Header = (props) => {

  const history=useHistory()
  const currentLocation = useLocation().pathname
  
    return (

        <>
   <header>
      <nav id="nav">
        <div id="log-wrapper">
          <img id="logo-img" src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="logo" />
          <p id="logo-text">Kafene</p>
        </div>
        { props.lStatus===true &&   <Link to="/orderslist" className={`nav-link  ${currentLocation.includes('order') ? "active" : "nav-link" } `} >Orders</Link>}
         { props.lStatus===true &&   <Link to="/productlist" className={`nav-link  ${currentLocation.includes('product') ? "active" : "nav-link" } `} >Products</Link>}
        { props.lStatus===true &&  <Link to="/userlist" className={`nav-link  ${currentLocation.includes('userlist') ? "active" : "nav-link" } `} >Users</Link>}
        { props.lStatus===true && <p onClick={()=>localStorage.setItem("logInStatus",JSON.stringify(false),
        props.logInStatus(false),
        history.push("")
        )} className="nav-link " id="logout-btn" href=" ">Log Out</p>}
          

      </nav>
    </header>
        </>
    )
}

const mapStateToProps = (state) => ({

  lStatus:state.loginStatus
    
})

const mapDispatchToProps =(dispatch)=>({

  logInStatus:(payload)=>dispatch(LoginStatus(payload))
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
