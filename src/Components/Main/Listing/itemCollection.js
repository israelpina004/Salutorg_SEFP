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
    if (userId !== null) { // Wait until userId is set
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

// This needs to be pulled from db
/*
const ListingItems = [
  {
    id: 1,
    category: "Electronics",
    title: "Luxury High-End Item",
    price: 1249.69,
    imageUrl: "https://picsum.photos/200?random=6",
    description: "A highly sought-after collectible.",
    topBid: 1049.57,
    deadline: "2024-05-13",
  },
  {
    id: 2,
    category: "Clothing",
    title: "Exclusive Collector's Piece",
    price: 1570.38,
    imageUrl: "https://picsum.photos/200?random=7",
    description: "In excellent condition and well-maintained.",
    topBid: 966.71,
    deadline: "2025-04-08",
  },
  {
    id: 3,
    category: "Art",
    title: "Handmade Custom Design",
    price: 571.76,
    imageUrl: "https://picsum.photos/200?random=5",
    description: "A one-of-a-kind piece you won't find anywhere else.",
    topBid: 597.72,
    deadline: "2024-08-09",
  },
  {
    id: 4,
    category: "Tools",
    title: "Handmade Custom Design",
    price: 1852.68,
    imageUrl: "https://picsum.photos/200?random=2",
    description: "Crafted with premium materials and care.",
    topBid: 404.03,
    deadline: "2025-04-13",
  },
  {
    id: 5,
    category: "Books",
    title: "Handmade Custom Design",
    price: 1635.87,
    imageUrl: "https://picsum.photos/200?random=9",
    description: "A one-of-a-kind piece you won't find anywhere else.",
    topBid: 598.13,
    deadline: "2025-03-13",
  },
  {
    id: 6,
    category: "Sports Equipment",
    title: "Luxury High-End Item",
    price: 41.78,
    imageUrl: "https://picsum.photos/200?random=2",
    description: "A highly sought-after collectible.",
    topBid: 67.56,
    deadline: "2025-08-05",
  },
  {
    id: 7,
    category: "Tools",
    title: "Exclusive Collector's Piece",
    price: 537.52,
    imageUrl: "https://picsum.photos/200?random=5",
    description: "A highly sought-after collectible.",
    topBid: 753.58,
    deadline: "2024-03-17",
  },
  {
    id: 8,
    category: "Clothing",
    title: "Limited Edition Product",
    price: 332.0,
    imageUrl: "https://picsum.photos/200?random=6",
    description: "In excellent condition and well-maintained.",
    topBid: 721.45,
    deadline: "2025-08-11",
  },
  {
    id: 9,
    category: "Electronics",
    title: "Rare Vintage Item",
    price: 183.66,
    imageUrl: "https://picsum.photos/200?random=9",
    description: "In excellent condition and well-maintained.",
    topBid: 1304.49,
    deadline: "2025-03-21",
  },
  {
    id: 10,
    category: "Furniture",
    title: "Handmade Custom Design",
    price: 1779.1,
    imageUrl: "https://picsum.photos/200?random=3",
    description: "In excellent condition and well-maintained.",
    topBid: 1075.5,
    deadline: "2024-11-21",
  },
];
*/