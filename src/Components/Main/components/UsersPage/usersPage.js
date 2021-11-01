import axios from 'axios';
import React,{useEffect,useState} from 'react';
import './usersPage.css'
const UserPage = () => {
   
const [userList, setUserList] = useState([])
const [searchData, setSearchData] = useState([])
const [inputSearch, setInputSearch] = useState("")
const [loader,setLoader]=useState(true)



    useEffect(() => {

        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
            .then(res=>{
                setUserList(res.data)
                setSearchData(res.data)
                setLoader(false)
            })
       
    }, [])

const handleSubmit=(e)=>{
    e.preventDefault()
    const searchItem=searchData.filter(item=>item.fullName.toLowerCase().includes(inputSearch.toLowerCase()))
    // console.log(searchItem)
    setUserList(searchItem)
}
const handleReset=()=>{
    setUserList(searchData)
    setInputSearch("")


}
    return ( 
        <>
         <section id="order-section">
            <h1>Users</h1>
           <div id="search-order-wrapper">
             <form onSubmit={handleSubmit} id="form-search">
               <input id="input-search" type="search" value={inputSearch} onChange={(e)=>setInputSearch(e.target.value)} placeholder="Search by Name"/>
               <input id="search-btn" type="submit" value="Search"/>
               <input id="reset-btn" type="reset" onClick={handleReset} value="Reset"/>
             </form>

            <table id="table">
              <thead>
                <tr className="table-heading-row">
                 <th className="table-heading">ID</th>
                 <th className="table-heading">User Avtar</th>
                 <th className="table-heading">Full Name</th>
                 <th className="table-heading">DoB</th>
                 <th className="table-heading">Gender</th>
                 <th className="table-heading">Current Location</th>
               </tr>
              </thead>
              <tbody id="table-body">
                 {loader ? <h1 style={{textAlign:"center" ,color:"teal"}}>Loading...!</h1> : userList.map((item,index)=> <RowsData {...item} key={index} />)}
              </tbody>

            </table>
          </div>
        </section>
      </>
     );
}
 
export default UserPage;

const RowsData = (props) => {

    const day = props.dob.split('-')[0];
    const month = props.dob.split('-')[1];
    const year = props.dob.split('-')[2];

    return ( 
        <>
         <tr className="order-item-wrapper">
             <td className="table-data-fade">{props.id}</td>
             <td className="table-data">
                 <img src={props.profilePic} alt="profile pice" />
              </td>
              <td className="table-data-fade">{props.fullName}</td>
              <td className="table-data">{`${day} ${month}, ${year}`}</td>
              <td className="table-data-fade">{props.gender}</td>
              <td className="table-data-fade">{`${props.currentCity}, ${props.currentCountry}`}</td>
         </tr>
        </>
     );
}
 