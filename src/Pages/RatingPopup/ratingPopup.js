import React, { useState } from 'react';
import './ratingPopup.css';

const RatingPopup = ({ show, onClose, onSubmitRating, item }) => {
    const [rating, setRating] = useState(null);
    const [hoveredRating, setHoveredRating] = useState(null);

    if (!show) return null; // Don't render the popup if `show` is false

    const handleMouseEnter = (value) => {
        setHoveredRating(value); // Update hovered star
    };

    const handleMouseLeave = () => {
        setHoveredRating(null); // Clear hovered star when the mouse leaves
    };

    const handleClick = (value) => {
        setRating(value); // Set the selected star rating
    };

    const handleSubmit = async () => {
        if (rating) {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/updaterating`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        rating: rating,
                        userId: item.seller_id, // Assuming each purchase has a seller_id
                    }),
                });
    
                const data = await response.json();
    
                console.log('Response status:', response.status); // Add this
                console.log('Response data:', data); // Add this
    
                if (data.success) {
                    alert(`You rated ${rating} stars. ${rating === 1 ? "We're sorry about your experience." : "Thank you!"}`);
                    onClose();
                    setRating(null); // Reset the selected stars
                } else {
                    alert("Failed to submit rating. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting rating:", error);
                alert("There was an error submitting your rating.");
            }
        } else {
            alert("You haven't selected a rating!");
        }
    };
    
    

    const handleClose = () => {
        onClose();
        setRating(null); // Resets stars selected after popup closes
    }

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Rate Seller</h2>
                <p>Rate your experience!</p>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            className={`star ${
                                hoveredRating >= value || rating >= value ? 'selected' : ''
                            }`}
                            onClick={() => handleClick(value)}
                            onMouseEnter={() => handleMouseEnter(value)}
                            onMouseLeave={handleMouseLeave}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className='buttons'>
                    <button onClick={handleSubmit} className="submit-bttn" >Submit</button>
                    <button onClick={handleClose} className="close-bttn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default RatingPopup;