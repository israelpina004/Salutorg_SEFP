// import { Link } from "react-router-dom";
import React, {useState} from 'react';
import './purchases.css'
import Header from "../../Components/Header/header";
import RatingPopup from "../RatingPopup/ratingPopup";

const Purchases=()=> {
    const [Items, setItems]=useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const addPurchase=()=>{
        const newPurchase={
            image: 1,
            id: 1,
            sellerId: 1,
            name: "Item Name",
            price: 70.99,
            date: Date(),
        };
        setItems((prevPurchases) => [newPurchase, ...prevPurchases]);            
    }

    const handleRateSeller = (item) => {
        setCurrentItem(item);
        setShowPopup(true);   // Show the popup
    };

    const closePopup = () => {
        setShowPopup(false);  // Hide the popup
    };

    const itemsList=Items.map(item =>
        <div className='purchase'>
            <img className="purchase-image" src="https://picsum.photos/200" alt="Item" />
            <div className='purchase-info'>
                <li key={item}>Order Number: {item.id} <br />{item.name} <br /> US ${item.price} <br /> Order Date: {item.date}</li>
                <button className='rate-seller-button' onClick={() => handleRateSeller(item)}>Rate Seller</button>            
            </div>            
        </div>)

    // API for submitting rating
    const submitRating = async (sellerId, rating) => { 
        try { 
            const response = await fetch("/api/updateSellerRating", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ sellerId, rating }), 
            }); 
            const data = await response.json(); 
            
            if (data.success) {
                alert(data.message);
            } 
            else {
                console.error(data.error); 
            } 
        } 
        catch (error) {
            console.error("Error submitting rating:", error); 
        }
    };

    return(
        <>
        <Header>Header</Header>
        <h1 className='title'>Purchase History</h1>
        <div>
            <button onClick={addPurchase}> Add Purchase</button>
        </div>
        <div>
            <ul>{itemsList}</ul>
        </div>
        <RatingPopup
            show={showPopup}
            onClose={closePopup}
            onSubmitRating={(rating) =>
                submitRating(currentItem?.sellerId, rating)
            }
            item={currentItem}
        />
            
        </>
    )
}
export default Purchases;
