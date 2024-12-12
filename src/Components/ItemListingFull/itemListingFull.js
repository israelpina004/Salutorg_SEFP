import { useState } from "react";
import "./itemListingFull.css";
import PropTypes from "prop-types";
import Header from "../../Components/Header/header";

function ItemListingFull({ image, name, currentPrice, description, topBid: initialTopBid, deadline, itemId, placeBid }) {
  console.log("ItemListingFull props:", { image, name, currentPrice, description, initialTopBid, deadline });

  const [bidAmount, setBidAmount] = useState("");
  const [topBid, setTopBid] = useState(initialTopBid); // State for the top bid

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const bidValue = parseFloat(bidAmount); // Convert bidAmount to a float
    if (isNaN(bidValue) || bidValue <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      const newTopBid = await placeBid(bidValue, itemId); // Get the updated top bid from the function
      if (newTopBid !== null && newTopBid > topBid) {
        setTopBid(newTopBid); // Update the state with the new top bid
        alert("Bid placed successfully!");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }

    setBidAmount(""); // Clear the input field
  };

  return (
    <>
      <Header />
      <div className="item-listing-full">
        <div className="item-image-full">
          {image ? (
            <img
              src={image.startsWith("data:image") ? image : `data:image/jpeg;base64,${image}`} // Handle image as base64 or URL
              alt={name}
              className="item-image"
            />
          ) : (
            <div className="placeholder">No Image Available</div>
          )}
        </div>
        <div className="item-details-full">
          <h2>{name || "Unnamed Item"}</h2>
          <p className="current-price">
            Buy Now: ${Number(currentPrice || 0).toFixed(2)}
          </p>
          <p className="description">
            {description && description.trim() ? description : "No description available."}
          </p>
        </div>
        <div className="bid-info">
          <button className="top-bid">
            Top Bid: {topBid ? `$${Number(topBid).toFixed(2)}` : "N/A"}
          </button>
          <button className="deadline">Deadline: {deadline || "N/A"}</button>
          <form onSubmit={handleBidSubmit}>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
            />
            <button type="submit">Place Bid</button>
          </form>
        </div>
      </div>
    </>
  );
}

ItemListingFull.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  currentPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  description: PropTypes.string,
  topBid: PropTypes.number,
  deadline: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired, // Added itemId prop for bids
  placeBid: PropTypes.func.isRequired, // Added function to handle placing bids
};

ItemListingFull.defaultProps = {
  image: null,
  description: "No description available.",
  topBid: null,
};

export default ItemListingFull;
