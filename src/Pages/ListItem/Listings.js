import Header from "../../Components/Header/header";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import './listing.css';

//____________________________________________________________________________________________________________________________________________________________________________
//                                                                               Rent Page
//____________________________________________________________________________________________________________________________________________________________________________

function RentalPage(){

    const [idk, setidk]=useState([]);
    const [empty, setEmpty]=useState(true);

    useEffect(()=>{
        fetch('http://localhost:8081/api/readRentItems', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response =>response.json())
        .then(data=>{
            console.log("data received:", data);
            console.log("Data:", data);
            
            setidk(data.result)
            console.log("idk:", data.result);
            if(data.result.length!==0){
                setEmpty(false);
            }
        })
        .catch((error)=>{
            console.error("Fatoumatas Error: ", error);
        });

    }, []) 

    if(empty){
        return(
            <>
        <p>No items yet</p>
        </>
        )
    }


    const itemsList=idk.map(item =>
        <div className='purchase'>
            <img className="purchase-image" src={`data:image/jpeg;base64,${item.image}`} alt="Item" />
            <div className='purchase-info'>
                <li key={item.id}>
                    <b>Listing Title:</b> {item.name} <br />
                    <b>Condition:</b> {item.condition} <br />
                    <b>Rental Rate:</b> ${item.rental_rate} <br />
                    <b>Category:</b> {item.category} <br />
                    <b>Description:</b> {item.description} <br />
                    </li>
                <div className="edit_top">
                <button className='edit -listing-button'>Edit Listing</button>            
                <button className='top -bid-button'>View Requests</button>            
                </div>
            </div>            
        </div>
    )
    return(     
        <>
        <p>Rental Page</p>
        <div>
            <ul>{itemsList}</ul>
        </div>        
        
        </>
    )
}


//__________________________________________________________________________________________________________________________________________________
//                                                          Sell Page
//_________________________________________________________________________________________________________________________________________________


function SellPage(){

    const [items, setItems]=useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(()=>{
        fetch('http://localhost:8081/api/readSellItems', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response =>response.json())
        .then(data=>{
            console.log("data received:", data);
            console.log("Data:", data);
            
            setItems(data.result)
            console.log("items:", data.result);
            if(data.result.length!==0){
                setLoading(false);
            }
        })
        .catch((error)=>{
            console.error("Fatoumatas Error: ", error);
        });

    }, []) 
    if(loading){
        return (
        <>
            <div>
            <p>No items to List yet</p>
            </div>
        </>
        )
        
    }

const itemsList = items.map(item => (
    <div className='purchase' key={item.id}>  {/* Added the key prop here */}
        <img className="purchase-image" src={`data:image/jpeg;base64,${item.image}`} alt="Item" />
        <div className='purchase-info'>
            <b>Listing Title:</b> {item.name} <br />
            <b>Condition:</b> {item.condition} <br />
            <b>Starting Price:</b> ${item.starting_price} <br />
            <b>Category:</b> {item.category} <br />
            <b>Bidding End Date:</b> {item.deadline} <br />
            <b>Description:</b> {item.description} <br />
        </div>
        <div className="edit_top">
            <button className='edit-listing-button'>Edit Listing</button>            
            <button className='top-bid-button'>Top Bid</button>            
        </div>
    </div>
));



    return(
        <>
        <p>Sell Page</p>
        <div>
            <ul>{itemsList}</ul>
        </div>
        </>
    )
}



//__________________________________________________________________________________________________________________________________________________
//                                                          Main Page
//_________________________________________________________________________________________________________________________________________________


const Listings=()=> {

    const [currentPage, setPage]=useState("sell")

        return(
            <>
            <Header></Header>
            <h1 className="listings-title"><b>Listings</b></h1>
            <div className="list-button">
            <Link to="/sell-form"><button className="rent_sell-button">Sell an Item</button></Link>
            <Link to="/rent-form">< button className="rent_sell-button">Rent an Item</button></Link>
            </div>

            <div className="tab-container">
                <button className="tab" onClick={()=>setPage("sell")}>Sell Page</button>
                <button className="tab" onClick={()=>setPage("rent")}>Rent Page</button>
            </div>
            {currentPage=== "sell" && <SellPage />}
            {currentPage=== "rent" && <RentalPage />}

            
            
            

            </>
        )
}
export default Listings 
