import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { useHistory } from 'react-router'
import './orderPage.css'

const OrdersList = () => {

const [orderList,setOrderList] = useState([])
const [filteredList,setFilteredlist] = useState([])
const [showNew, setShowNew] = useState(true)
const [showPacked, setShowPacked] = useState(true)
const [showInTransit, setShowInTransit] = useState(true)
const [showDelivered, setShowDelivered] = useState(true)
const [loader,setLoader]=useState(true)

useEffect(() => {

    axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
    .then(res => {
        setOrderList(res.data)
        setFilteredlist( res.data)
        setLoader(false)
        // console.log(res.data)

    })
   
}, [])


const getOrdersByStatus = (type, value) => {
    if(!value) {
        return []
    }
    // eslint-disable-next-line default-case
    switch(type) {
        case "new":
            const arr = [...orderList].filter(item => {
                return item.orderStatus === "New"
            })
            return arr;
        case "packed":
            return [...orderList].filter(item => {
                return item.orderStatus === "Packed"
            })
        case "transit":
            return [...orderList].filter(item => {
                return item.orderStatus === "InTransit"
            })
        case "delivered":
            return [...orderList].filter(item => {
                return item.orderStatus === "Delivered"
            })
    }
}

const onFilterCheckboxClick = (type, value) => {
    // eslint-disable-next-line default-case
    switch(type) {
        case "new":
            if(value) {
                var updatedData = [...getOrdersByStatus('new', value), ...getOrdersByStatus('packed', showPacked), ...getOrdersByStatus('transit',showInTransit), ...getOrdersByStatus('delivered', showDelivered)];
                setShowNew(value)
                setFilteredlist([...updatedData])
                
            } else {
                var updatedData = [...filteredList].filter(item => {
                    return item.orderStatus !== 'New'
                })
                setShowNew(value)
                setFilteredlist(updatedData)

            }
            break;
        case "packed":
            if(value) {
                var updatedData = [...getOrdersByStatus('new', showNew), ...getOrdersByStatus('packed', value), ...getOrdersByStatus('transit', showInTransit), ...getOrdersByStatus('delivered', showDelivered)];
                setShowPacked(value)
                setFilteredlist([...updatedData])
               
            } else {
                var updatedData = [...filteredList].filter(item => {
                    return item.orderStatus !== 'Packed'
                })
                setShowPacked(value)
                setFilteredlist(updatedData)

            }
            break;
        case "transit":
            if(value) {
                var updatedData = [...getOrdersByStatus('new', showNew), ...getOrdersByStatus('packed', showPacked), ...getOrdersByStatus('transit', value), ...getOrdersByStatus('delivered', showDelivered)];
                setShowInTransit(value)
                setFilteredlist([...updatedData])
            } else {
                var updatedData = [...filteredList].filter(item => {
                    return item.orderStatus !== 'InTransit'
                })
                setShowInTransit(value)
                setFilteredlist(updatedData)

            }
            break;
        case "delivered":
            if(value) {
                var updatedData = [...getOrdersByStatus('new', showNew), ...getOrdersByStatus('packed', showPacked), ...getOrdersByStatus('transit', showInTransit), ...getOrdersByStatus('delivered', value)];
                setShowDelivered(value) 
                setFilteredlist([...updatedData])
            } else {
                var updatedData = [...filteredList].filter(item => {
                    return item.orderStatus !== 'Delivered'
                })
                setShowDelivered(value) 
                setFilteredlist(updatedData)
            }
            break;
    }
}

    return ( 
        <>
              <section id="order-section">
                 <h1>Orders</h1>
               <div id="filter-order-wrapper">
                    <aside id="filter-item-wrapper">
                      <h3>Filters</h3>
                    <div id="filter-option-wrapper">
                     <p id="order-count">Count:{filteredList.length} </p>
                     <label className="filter-option-label">
                         <input className="filter-opt-checkbox" onClick={(e) => onFilterCheckboxClick('new', e.target.checked)}
                          type="checkbox"  name="order-new"     defaultChecked={showNew && "checked"}  value="New"   />
                         New
                     </label >
                    <label className="filter-option-label">
                        <input className="filter-opt-checkbox" onClick={(e) => onFilterCheckboxClick('packed', e.target.checked)}
                         type="checkbox"  name="order-packed"  defaultChecked={showPacked && "checked"}  value="Packed"/>
                        Packed
                    </label>
                    <label className="filter-option-label" >
                        <input className="filter-opt-checkbox"  onClick={(e) => onFilterCheckboxClick('transit', e.target.checked)}
                          type="checkbox"      name="order-transit"  defaultChecked={showInTransit && "checked"}           value="InTransit"                />
                        InTransit
                    </label >
                   <label className="filter-option-label" >
                       <input className="filter-opt-checkbox" onClick={(e) => onFilterCheckboxClick('delivered', e.target.checked)}
                         type="checkbox"    name="order-delivered"      defaultChecked={showDelivered && "checked"}      value="Delivered"      />
                      Delivered
                    </label >
                    </div>
                   </aside>

                 <table id="table">
                 <thead>
                   <tr className="table-heading-row">
                    <th className="table-heading">ID</th>
                    <th className="table-heading">Cusomer</th>
                    <th className="table-heading">Data</th>
                    <th className="table-heading">Amount</th>
                    <th className="table-heading">Status</th>
                  </tr>
                  </thead>

                <tbody id="table-body">
                    { loader ? <h1 style={{textAlign:"center" ,color:"teal"}}>Loading...!</h1> : filteredList.map((item,index) => <Rows key={index} {...item} /> )}
                </tbody> 

            </table>
           </div>
      </section>
        </>
     );
}
 
export default OrdersList;

const Rows = (props) => {
        const history=useHistory()
        const day = props.orderDate.split('-')[0];
        const month = props.orderDate.split('-')[1];
        const year = props.orderDate.split('-')[2];

    return ( 
        <>
        <tr onClick={()=>history.push(`orderDetailsPage/${props.id}`)} className="order-item-wrapper"  id="Delivered-0">
            <td className="table-data-fade">{props.id}</td>
            <td className="table-data">Sally {props.customerName}</td>
            <td className="table-data">{`${day} ${month}, ${year}`} <br /> 
              {props.orderTime}</td>
            <td className="table-data-fade">{`$${props.amount}`}</td>
            <td className="table-data">{props.orderStatus}</td>
        </tr>
        </>
     );
}
 