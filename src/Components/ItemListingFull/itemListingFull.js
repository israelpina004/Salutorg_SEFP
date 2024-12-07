import "./itemListingFull.css";
import PropTypes from "prop-types";

function ItemListingFull({ image, name, currentPrice, description, topBid, deadline }) {
  return (
    <div className="item-listing-full">
      <div className="item-image-full">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
      </div>
      <div className="item-details-full">
        <h2>{name || "Unnamed Item"}</h2>
        <p className="current-price">Current Price: ${currentPrice?.toFixed(2) || "0.00"}</p>
        <p className="description">{description || "No description available."}</p>
      </div>
      <div className="bid-info">
        <button className="top-bid">Top Bid: {topBid ? `$${topBid.toFixed(2)}` : "N/A"}</button>
        <button className="deadline">Deadline: {deadline || "N/A"}</button>
      </div>
    </div>
  );
}

// Prop validation
ItemListingFull.propTypes = {
  image: PropTypes.string, // URL for the item image
  name: PropTypes.string.isRequired, // Name of the item
  currentPrice: PropTypes.number.isRequired, // Current price of the item
  description: PropTypes.string, // Description of the item
  topBid: PropTypes.number, // Top bid amount
  deadline: PropTypes.string.isRequired, // Deadline in mm/dd/yy format
};

ItemListingFull.defaultProps = {
  image: null,
  description: "No description available.",
  topBid: null,
};

export default ItemListingFull;
