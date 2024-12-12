import { Link } from "react-router-dom";
import "./itemCollection.css";
import { useState, useEffect } from "react";

const ItemCard = ({ id, title, price, imageUrl }) => {
  const isPlaceholder = !id;

  return (
    <Link to={`/item/${id}`}  className="link-item-card">
        <div className={`item-card ${isPlaceholder ? "placeholder-card" : ""}`}>
          <div className="item-image-container">
            {imageUrl ? (
              <img src={`data:image/jpeg;base64,${imageUrl}`} alt={title} className="item-image" />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
          </div>
          <div className="item-details">
            <p className="item-title">{title || "No Items Available"}</p>
            {price && <p className="item-price">${price}</p>}
          </div>
      </div>
    </Link>
  );
};


const ItemCollection = ({ title, isMyListings }) => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.loggedInUser) {
          console.log("Logged in user ID:", data.loggedInUser.user_ID);
          setUserId(data.loggedInUser.user_ID);
        }
      })
      .catch((err) => console.error("Error fetching logged-in user:", err));
  }, []);

  // Fetch and filter items
  useEffect(() => {
    if (userId !== null) {
      fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/readSellItems`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            console.log("Fetched items:", data.result);
            const filteredItems = data.result.filter((item) =>
              isMyListings ? item.seller_ID === userId : item.seller_ID !== userId
            );
            console.log("Filtered items:", filteredItems);
            setItems(filteredItems);
          }
        })
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [userId, isMyListings]);

  return (
    <div className="item-collection">
      <h2>{title}</h2>
      <p>Recommended for you</p>
      <div className="item-list">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.name}
              price={item.price}
              imageUrl={item.image}
            />
          ))
        ) : (
          <ItemCard
            id={null}
            title="Nothing yet"
            price=""
            imageUrl={null} // Or a placeholder image if desired
          />
        )}
      </div>
    </div>
  );
};


export default ItemCollection;

