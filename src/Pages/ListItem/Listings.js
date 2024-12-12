import Header from "../../Components/Header/header";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import './listing.css';

//____________________________________________________________________________________________________________________________________________________________________________
//                                                                               Rent Page
//____________________________________________________________________________________________________________________________________________________________________________

function RentalPage(){

    const [items, setItems]=useState([]);
    const [empty, setEmpty]=useState(true);

    useEffect(()=>{
        fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/readRentItems`, {
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
                setEmpty(false);
            }
        })
        .catch((error)=>{
            console.error("My Error: ", error);
        });

    }, []) 

    if(empty){
        return(
            <>
            <p className="noitems">No items to list yet</p>
            </>
        )
    }


    const itemsList=items.map(item =>
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


// function SellPage() {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userId, setUserId] = useState(null); // To store logged-in user's ID
  
//     // Fetch logged-in user ID
//     useEffect(() => {
//       fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data && data.loggedInUser) {
//             setUserId(data.loggedInUser.user_ID); // Set logged-in user's ID
//           } else {
//             console.error("No user is currently logged in.");
//           }
//         })
//         .catch((err) => console.error("Error fetching logged-in user:", err));
//     }, []);
  
//     // Fetch items for the logged-in user
//     useEffect(() => {
//       if (userId) {
//         fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getusersellitems`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("data received:", data);
//             setItems(data.items || []);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error("Error fetching sell items:", error);
//             setLoading(false);
//           });
//       }
//     }, [userId]);
  
//     if (loading) {
//       return <p className="noitems">Loading items...</p>;
//     }
  
//     if (items.length === 0) {
//       return <p className="noitems">No items to list yet.</p>;
//     }
  
//     const itemsList = items.map((item) => (
//       <div className="purchase" key={item.id}>
//         <img className="purchase-image" src={`data:image/jpeg;base64,${item.image}`} alt="Item" />
//         <div className="purchase-info">
//           <b>Listing Title:</b> {item.name} <br />
//           <b>Condition:</b> {item.condition} <br />
//           <b>Starting Price:</b> ${item.starting_price} <br />
//           <b>Category:</b> {item.category} <br />
//           <b>Bidding End Date:</b> {item.deadline} <br />
//           <b>Description:</b> {item.description} <br />
//         </div>
//         <div className="edit_top">           
//             <button className='option-button'>Accept Bid: (TOP BID HERE)</button>
//         </div>
//       </div>
//     ));
  
//     return (
//       <>
//         <p>Sell Page</p>
//         <div>
//           <ul>{itemsList}</ul>
//         </div>
//       </>
//     );
//   }

function SellPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // To store logged-in user's ID
    const [successMessage, setSuccessMessage] = useState(""); // To store success messages
    const [error, setError] = useState(""); // To store error messages
  
    // Fetch logged-in user ID
    useEffect(() => {
      fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.loggedInUser) {
            setUserId(data.loggedInUser.user_ID); // Set logged-in user's ID
          } else {
            console.error('No user is currently logged in.');
          }
        })
        .catch((err) => console.error('Error fetching logged-in user:', err));
    }, []);

    useEffect(() => {
        if (!userId) {
            setError("You need to be logged in to view your items.");
            setLoading(false);
            return;
        }
    
        fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getusersellitems`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("API response data:", data);
            const validItems = Array.isArray(data.items) ? data.items.filter(item => {
                const itemId = Number(item.id);
                return !isNaN(itemId) && itemId >= 0;
            }) : [];
            setItems(validItems);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching sell items:', error);
            setError('Failed to load items. Please try again later.');
            setLoading(false);
        });
    }, [userId]);

    // Handler for accepting a bid
    const handleAcceptBid = async (id) => {
        const itemId = Number(id); // Convert ID to number here
        if (isNaN(itemId) || itemId < 0) {
            console.error("Invalid item ID:", id);
            setError("Invalid item ID.");
            return; // Exit early if invalid ID
        }
    
        console.log("Accepting bid for item_id:", itemId); // Log the value
        console.log("Request Body:", JSON.stringify({ id: itemId }));

        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/acceptBid`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: itemId }),  // Ensure id is a number and directly in the body
            });
    
            const data = await response.json();
    
            if (data.success) {
                setSuccessMessage(data.message);
                setError("");
                setItems(items.filter((item) => item.id !== itemId)); // Remove item from the list
            } else {
                setError(data.message);
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Error accepting bid:", error);
            setError("An error occurred while accepting the bid.");
            setSuccessMessage("");
        }
    };
    

    if (loading) {
      return <p className="noitems">Loading items...</p>;
    }
  
    if (items.length === 0) {
      return <p className="noitems">No items to list yet.</p>;
    }
  
    const itemsList = items.map((item) => (
        <div className="purchase" key={item.id}> {/* Ensure 'id' is correct */}
          <img 
            className="purchase-image" 
            src={item.image ? `data:image/jpeg;base64,${item.image}` : "path/to/placeholder.jpg"} 
            alt="Item"
          />
          <div className="purchase-info">
            <b>Listing Title:</b> {item.name} <br />
            <b>Condition:</b> {item.item_condition} <br />
            <b>Starting Price:</b> ${item.starting_price} <br />
            <b>Category:</b> {item.category} <br />
            <b>Bidding End Date:</b> {item.deadline} <br />
            <b>Description:</b> {item.description} <br />
          </div>
          <div className="edit_top">
            {/* Check if the 'id' exists and is passed */}
            <button 
                className="option-button"
                onClick={() => {
                    console.log("Item ID in button click:", item.id, typeof item.id);  // Log item.id and its type
                    handleAcceptBid(item.id);  // Ensure item.id is passed here
                }}
                >
                Accept Bid: ${item.current_bid || "No bids yet"}
            </button>

          </div>
        </div>
      ));
      
  
    return (
      <>
        <p>Sell Page</p>
        <div>
          {/* Display success or error message */}
          {successMessage && <p className="success">{successMessage}</p>}
          {error && <p className="error">{error}</p>}
          <ul>{itemsList}</ul>
        </div>
      </>
    );
  }

  


//__________________________________________________________________________________________________________________________________________________
//                                                          Main Page
//_________________________________________________________________________________________________________________________________________________


const Listings=()=> {

    const [currentPage, setPage]=useState("sell")

        return(
            <>
            <Header></Header>
            <h1 className="listings-title">Listings</h1>
            <div className="list-button">
            <Link to="/sell-form"><button className="rent_sell-button">Sell an Item</button></Link>
            <Link to="/rent-form">< button className="rent_sell-button">Rent an Item</button></Link>
            </div>

            <div className="tabs-container">
                <button className={`tab ${currentPage === "sell" ? "active-tab" : ""}`} 
                onClick={()=>setPage("sell")}>Sell Page</button>

                <button className={`tab ${currentPage === "rent" ? "active-tab" : ""}`} 
                onClick={()=>setPage("rent")}>Rent Page</button>
            </div>

            {currentPage=== "sell" && <SellPage />}
            {currentPage=== "rent" && <RentalPage />}

            </>
        )
}
export default Listings 