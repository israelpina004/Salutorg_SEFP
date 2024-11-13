import React, { useState } from "react";
import "./ItemListing.css";

function ItemListing() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded view
  const handleToggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`item-card ${isExpanded ? "expanded" : ""}`} onClick={handleToggleExpanded}>
      <div className="item-image">
        <img src="https://picsum.photos/200" alt="Item" />
        <button className="favorite-btn">❤️</button>
      </div>
      <div className="item-details">
        <p className="item-title">Item Title</p>
        <p className="item-price">$79.95</p>
        
        {/* Expanded content displayed only when isExpanded is true */}
        {/* {isExpanded && (
          <div className="expanded-details">
            <p>Current Price: "$75.50"</p>
            <p className="description">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum."
            </p>
            <button className="top-bid">Top Bid: N/A</button>
            <button className="deadline">Deadline: mm/dd/yy</button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ItemListing;

