import React, { useState, useEffect } from "react";
import "./purchases.css";
import Header from "../../Components/Header/header";
import RatingPopup from "../RatingPopup/ratingPopup";

const Purchases = () => {
  const [Items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch purchase history
  useEffect(() => {
    const fetchPurchases = async () => {
        try {
          const loginResponse = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
      
          const loginData = await loginResponse.json();
          if (!loginData.success || !loginData.loggedInUser) {
            console.error("User not logged in.");
            return;
          }
      
          const customerId = loginData.loggedInUser.user_ID;
          console.log("Fetched Customer ID:", customerId); // Log customer ID
      
          const purchasesResponse = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getPurchases`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId }),
          });
      
          const purchasesData = await purchasesResponse.json();
          if (purchasesData.success) {
            console.log("Fetched Purchases:", purchasesData.purchases);
            setItems(purchasesData.purchases);
          } else {
            console.error(purchasesData.error);
          }
        } catch (error) {
          console.error("Error fetching purchases:", error);
        }
      };

    fetchPurchases();
  }, []);

  const handleRateSeller = (item) => {
    setCurrentItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const itemsList = Items.map((item) => (
    <div className="purchase" key={item.id}>
      <img
        className="purchase-image"
        src={item.item_image ? `data:image/jpeg;base64,${item.item_image}` : "https://picsum.photos/200"}
        alt={item.item_name || "Purchased Item"}
      />
      <div className="purchase-info">
        <li>
          <b>Order Number:</b> {item.id} <br />
          <b>Item Name:</b> {item.item_name} <br />
          <b>Price:</b> US ${item.price} <br />
          <b>Purchase Date:</b> {new Date(item.purchase_date).toLocaleDateString()} <br />
        </li>
        <button className="rate-seller-button" onClick={() => handleRateSeller(item)}>
          Rate Seller
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <Header />
      <h1 className="title">Purchase History</h1>
      <div>
        <ul>{itemsList.length > 0 ? itemsList : <p>No purchases found.</p>}</ul>
      </div>
      <RatingPopup
        show={showPopup}
        onClose={closePopup}
        onSubmitRating={(rating) => console.log("Submitting rating:", rating)}
        item={currentItem}
      />
    </>
  );
};

export default Purchases;
