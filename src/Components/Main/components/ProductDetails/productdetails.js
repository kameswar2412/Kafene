import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router';
import './productDetails.css'
const ProductDetails = (props) => {

    const [productDetails, setProductDetails] = useState({})
    const [loader,setLoader]= useState(true)

    const parms=useParams()


useEffect(() => {

    axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products/${parms.id}`)
        .then((res)=>{
            setProductDetails(res.data)
            setLoader(false)
            // console.log(res.data)
             })
   
}, [])

    return ( 
        <div  className="details-container" >
          <h1>Product Details </h1>
          {loader ? <h1>Loading...!</h1> :   

          <div className="details-section">
              <p>Product Id : {productDetails.id}</p>
              <p>prescription : {productDetails.prescriptionRequired? "  Required" : " Not Required"}</p>
              <p>MedicineBrand : {productDetails.medicineBrand}</p>
              <p> MedicineName : {productDetails.medicineName}</p>
              <p>ExpiryDate: {productDetails.expiryDate}</p>
              <p>Amount : {productDetails.unitPrice}</p>
              <p>stock : {productDetails.stock}</p>
        </div>}
        </div>
     );
}
 
export default ProductDetails;