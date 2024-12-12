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

    const handleSubmit = () => {
        if (rating) {
            let message = '';

            if (rating == 1) {
                message = "We're sorry about your experience."
            }
            else {
                message = "Thank you!"
            }

            alert(`You rated ${rating} stars. ${message}`);
            onClose(); // Close the popup after submitting
            setRating(null); // Resets stars selected after popup closes
        }
        else {
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
