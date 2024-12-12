import { useState } from "react";
import Header from "../../Components/Header/header";
import  './form.css';

const SellForm=()=> {

    const [itemName, setName]= useState('');
    const [itemStartPrice, setStartPrice]= useState('');
    const [itemDescription, setDescription]= useState("");
    const [itemCondition, setCondition]= useState("");
    const [itemCategory, setCategory]= useState("");
    const [itemDeadline, setDeadline]= useState('');
    const [itemImage, setImage]=useState('');  

    //this would be to send data to the database
    const sendData = () => {
        if ( !itemName || !itemStartPrice || !itemDescription || !itemCondition || !itemCategory || !itemDeadline
        ) {
          alert("Please fill out all fields.");
          return;
        }
    
        const data = new FormData();
        data.append("name", itemName);
        data.append("description", itemDescription);
        data.append("item_condition", itemCondition);
        data.append("category", itemCategory);
        data.append("starting_price", parseFloat(itemStartPrice, 10));
        data.append("deadline", itemDeadline);
    
        if (itemImage) {
          data.append("image", itemImage);
        }

        
        fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/insertNewSell`, {
            method: 'POST',
            body: data,
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Success:', data); // Log success data
            if (data.error) {
              throw new Error(data.error); // Handle any error messages from the server
            }
            alert('Item inserted successfully!'); // Notify the user
            
            // Reset after submission
            setName('');
            setStartPrice('');
            setDescription('');
            setCondition('');
            setCategory('');
            setDeadline('');
            setImage('');
          })
          .catch((error) => {
            console.error('Error:', error); // Log any errors
            alert(`Failed to insert item: ${error.message}`); // Notify the user of the error
          });

        };
                
        return (
            <>
                <Header> </Header>
                <h1 className="sellrent-title">Sell Form</h1>
                <div className="sell-rent-form">
                    <form className="listing">
                        {/* Item Name */}
                        <label htmlFor="itemName" className="labels">Item Name: <span style={{ color: "red" }}>*</span></label>
                        <input
                            id="itemName"
                            type="text"
                            required
                            value={itemName}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
        
                        {/* Starting Price */}
                        <label htmlFor="itemStartPrice" className="labels">Item Starting Bid Price: <span style={{ color: "red" }}>*</span></label>
                        <input
                            id="itemStartPrice"
                            type="number"
                            required
                            value={itemStartPrice}
                            onChange={(e) => setStartPrice(e.target.value)}
                        />
                        <br />
        
                        {/* Condition */}
                        <label htmlFor="itemCondition" className="labels">Condition: <span style={{ color: "red" }}>*</span></label>
                        <input
                            id="itemCondition"
                            type="text"
                            required
                            value={itemCondition}
                            onChange={(e) => setCondition(e.target.value)}
                        />
                        <br />
        
                        {/* Category */}
                        <label htmlFor="itemCategory" className="labels">Category: <span style={{ color: "red" }}>*</span></label>
                        <input
                            id="itemCategory"
                            type="text"
                            required
                            value={itemCategory}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <br />
        
                        {/* Deadline */}
                        <label htmlFor="itemDeadline" className="labels">Bidding Deadline: <span style={{ color: "red" }}>*</span></label>
                        <input
                            id="itemDeadline"
                            type="date"
                            required
                            value={itemDeadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <br />
        
                        {/* Description */}
                        <label htmlFor="itemDescription" className="labels">Description: <span style={{ color: "red" }}>*</span></label>
                        <textarea
                            id="itemDescription"
                            required
                            value={itemDescription}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
        
                        {/* Image Upload */}
                        <label htmlFor="itemImage" className="labels">Upload Images:</label>
                        <input
                            id="itemImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {itemImage && (
                            <div className="image-preview">
                                <p>Preview:</p>
                                <img
                                    src={URL.createObjectURL(itemImage)}
                                    alt="Preview"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </form>
        
                    {/* Submit Button */}
                    <button onClick={sendData} disabled={!itemName || !itemStartPrice || !itemCondition || !itemCategory || !itemDeadline}>
                        Submit Listing
                    </button>
                </div>
            </>
        );
};
export default SellForm;





