import React from 'react'
import { connect } from 'react-redux'
import   Login  from './components/Login/login'
import OrdersList from './components/OrdersPage/orderpage'

export const Main = (props) => {
    return (
        <>
          {props.logInStatus ===false && <Login /> }  
          {props.logInStatus===true && <OrdersList />}
        </>
    )
}

const mapStateToProps = (state) => ({

    logInStatus:state.loginStatus
    
})



export default connect(mapStateToProps, null)(Main)
