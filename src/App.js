import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import  Header  from './Components/Header/header'
import  Main  from './Components/Main/main'
import Footer from './Components/Footer/footer'
import OrderDetails from './Components/Main/components/OrderDetils/details'
import ProductDetails from './Components/Main/components/ProductDetails/productdetails'
import OrdersList from './Components/Main/components/OrdersPage/orderpage'
import ProductPage from './Components/Main/components/ProductPage/productPage'
import UserPage from './Components/Main/components/UsersPage/usersPage'

export const App = (props) => {
    return (
        <>
        <BrowserRouter>

        <Header />
         <main>
        <Switch>

            {props.logInStatus===false &&   <Route path="/" exact component={Main} /> }

           
          { props.logInStatus && <Route path="/orderslist" component={OrdersList} />}
          { props.logInStatus && <Route path="/productlist" component={ProductPage} />}
           { props.logInStatus && <Route path="/orderDetailsPage/:id/" component={OrderDetails} />}
           { props.logInStatus &&  <Route path="/productDetails/:id/" component={ProductDetails} />}
           { props.logInStatus && <Route path="/userlist"  component={UserPage} />}



        </Switch>
        </main>
         <Footer />

        </BrowserRouter>
        </>
    )
}

const mapStateToProps = (state) => ({

    logInStatus:state.loginStatus
    
})



export default connect(mapStateToProps, null)(App)
