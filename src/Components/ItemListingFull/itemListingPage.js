import { useParams } from "react-router-dom";
import ItemListingFull from "./itemListingFull";
import { useState, useEffect } from "react";
import CommentSection from "../../Components/CommentSection/commentSection.js";

function ItemListingPage() {
  const [items, setItems] = useState([]);
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    console.log("Fetching items...");
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/readSellItems`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setItems(data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items", error);
        setLoading(false);
      });

    // Fetch the currently logged-in user using POST method (only once)
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
      method: 'POST', // Changed to POST method
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoggedInUser(data.loggedInUser);
        } else {
          console.error("Error fetching logged-in user");
        }
      })
      .catch((error) => {
        console.error("Error fetching logged-in user", error);
      });
  }, []);

  console.log("Logged in user:", loggedInUser);

  if (loading) {
    return <p>Loading items...</p>;
  }

  const item = items.find((item) => item.id === parseInt(id)); // Find the item by ID

  if (!item) {
    return <p>Item not found.</p>; // Display error if item is not found
  }

  // Function to handle placing bids
  const placeBid = async (bidAmount, itemId) => {
    if (!loggedInUser) {
      alert("Please log in to place a bid.");
      return;
    }
  
    const bidData = { userId: loggedInUser.user_ID, itemId, bidAmount };
  
    try {
      const bidResponse = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/placeBid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bidData),
      });
  
      const bidResult = await bidResponse.json();
  
      if (bidResult.success) {
  
        // Update the topBid dynamically
        return bidAmount; // Return the new top bid amount
      } else {
        alert(bidResult.message); // Show the specific error message returned from the backend
        return null; // Return null to indicate no update
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("An error occurred while placing the bid. Please try again.");
      return null; // Return null to indicate no update
    }
  };
  
  

  return (
    <>
      <div>
        <ItemListingFull
          image={item.image}
          name={item.name}
          currentPrice={item.price}
          topBid={item.topBid}
          deadline={item.deadline}
          itemId={item.id} // Pass itemId for bidding
          placeBid={placeBid} // Pass the placeBid function
        />
        <CommentSection />
      </div>
    </>
    
  );
}

export default ItemListingPage;


