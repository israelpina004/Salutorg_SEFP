import React from "react";
import "./ItemDetailsModal.css";

function ItemDetailsModal() {
  return (
    <div className="item-listing">
      <div className="item-image">
        {/* Placeholder for the item image */}
      </div>
      <div className="item-details">
        <h2>Item Name</h2>
        <p className="current-price">Current Price: "$75.50"</p>
        <p className="description">
          "Lorem ."
        </p>
      </div>
      <div className="bid-info">
        <button className="top-bid">Top Bid: N/A</button>
        <button className="deadline">Deadline: mm/dd/yy</button>
      </div>
    </div>
  );
}


export default ItemDetailsModal;
