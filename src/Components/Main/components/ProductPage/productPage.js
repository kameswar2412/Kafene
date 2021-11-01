import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { useHistory } from 'react-router';

const ProductPage = () => {

     const [productList, setProductList] = useState([])
     const [filteredList, setFilteredList] = useState([])
     const [showExpired, setShowExpired] = useState(true)
     const [showLowStock, setShowLowStock] = useState(true)
     const [loader,setLoader]=useState(true)

     useEffect(() => {
          
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
        .then(res => {
            // console.log(res.data)
            const productData = [...res.data].map(item => {
                return {
                    ...item,
                    isExpired: (new Date(item.expiryDate).getTime() < new Date().getTime()),
                    isLowStock: item.stock < 100
                }
            })
            setProductList([...productData])
            setFilteredList([...productData])
            setLoader(false)
        })
    }, [])
    
   const getOrdersByStatus = (type, value) => {
    if(!value) {
        return []
    }
    // eslint-disable-next-line default-case
    switch(type) {
        case "expired":
             const arr = [...productList].filter(item => {
                return item.isExpired
            })
            return arr;
        case "lowStock":
            return [...productList].filter(item => {
                return item.isLowStock
            })
        case "remaining": 
            var result = [...productList].filter(item => {
                return !item.isLowStock 
            }).filter(item => {
                return !item.isExpired
            })
            result.pop()
            result.pop()
            return result
    }
}

const onFilterCheckboxClick = (type, value) => {
    // eslint-disable-next-line default-case
    switch(type) {
        case "expired":
            if(value) {
                var updatedData = [...getOrdersByStatus('expired', value), ...getOrdersByStatus('lowStock', showLowStock), ...getOrdersByStatus('remaining', value)];

                setShowExpired(value)
                setFilteredList( [...updatedData])


            } else {
                // eslint-disable-next-line no-redeclare
                var updatedData = [...filteredList].filter(item => {
                    return !item.isExpired
                })
                    setShowExpired(value)
                    setFilteredList( [...updatedData, ...getOrdersByStatus('remaining', value)])
            }
            break;
        case "lowStock":
            if(value) {
                // eslint-disable-next-line no-redeclare
                var updatedData = [...getOrdersByStatus('expired', showExpired), ...getOrdersByStatus('lowStock', value), ...getOrdersByStatus('remaining', value)];

                    setShowLowStock(value)  
                    setFilteredList( [...updatedData])
            } else {
                var updatedData = [...filteredList].filter(item => {
                    return !item.isLowStock
                })
                setShowLowStock(value)  
                setFilteredList( [...updatedData, ...getOrdersByStatus('remaining', value)])
            }
            break;
    }
}



    return ( 
        <>
         <section id="order-section">
           <h1>Product</h1>
           <div id="filter-order-wrapper">
              <aside id="filter-item-wrapper">
               <h3>Filters</h3>
              <div id="filter-option-wrapper">
                 <p id="order-count">Count: {filteredList.length}</p>
                <label className="filter-option-label"   >
                    <input type="checkbox" onClick={(e) => onFilterCheckboxClick('expired', e.target.checked)}
                 name="order-new"

                  defaultChecked={showExpired && "checked"}

                  value="Expired"/>
                  Expired
                </label>
                <label className="filter-option-label">
                    <input
                  type="checkbox" onClick={(e) => onFilterCheckboxClick('lowStock', e.target.checked)}
                  name="order-packed"
                   defaultChecked={showLowStock && "checked"}
                  value="Low Stock"/>
                  Low Stock
                </label >
               </div>
              </aside>
              <table id="table">
                <thead>
                <tr className="table-heading-row">
                  <th className="table-heading">ID</th>
                  <th className="table-heading">Product Name</th>
                  <th className="table-heading">Product Brand</th>
                  <th className="table-heading">Expiry Date</th>
                  <th className="table-heading">Unit Price</th>
                  <th className="table-heading">Stock</th>
                </tr>
                </thead>
               <tbody id="table-body">
                   {loader ? <h1 style={{textAlign:"center" ,color:"teal"}}>Loading...!</h1> : filteredList.map((item,index)=><RowData key={index} {...item}  />)}
               </tbody>

            </table>
          </div>
      </section>
        </>
     );
}
 
export default ProductPage;

const RowData = (props) => {
     
       const history=useHistory()
       const day = props.expiryDate.split('-')[0];
        const month = props.expiryDate.split('-')[1];
        const year = props.expiryDate.split('-')[2];

    return ( 
        <>
         <tr onClick={()=>history.push(`productDetails/${props.id}`)} className="order-item-wrapper" id="product-1344882600000-725-0">
             <td className="table-data-fade"> {props.id}</td>
             <td className="table-data">{props.medicineName} </td>
             <td className="table-data-fade">{props.medicineBrand}</td>
             <td className="table-data">{`${day} ${month}, ${year}`}</td>
             <td className="table-data-fade">${props.unitPrice}</td>
             <td className="table-data-fade">{props.stock}</td>
         </tr>
        </>
     );
}
 


    

    