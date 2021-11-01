import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import './orderDetails.css'
const OrderDetails = (props) => {

    const [orderDetails, setOrderDetails] = useState({})
    const [loader,setLoader]= useState(true)
    const parms=useParams()


useEffect(() => {

    axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders/${parms.id}`)
        .then((res)=>{
            setOrderDetails(res.data)
            setLoader(false)
            // console.log(res.data)
             })
},[])

    return ( 
        <div className="details-container">
          <h1> Order Details </h1>
          {loader ? <h1>Loading...!</h1> :   
          <div className="details-section">
          <p>OrderId : {orderDetails.id}</p>
          <p> customerName : {orderDetails.customerName}</p>
          <p>OrderDate : {orderDetails.orderDate}</p>
          <p>Amount : ${orderDetails.amount}</p>
          <p>OrderStatus : {orderDetails.orderStatus}</p>
          </div>}
        </div>
     );
}
 
export default OrderDetails;