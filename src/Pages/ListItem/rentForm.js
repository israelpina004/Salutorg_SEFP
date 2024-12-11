import { useState } from "react";
import Header from "../../Components/Header/header";
import './form.css';

const RentForm=()=> {

    const [itemName, setName]= useState('')
    const [itemRate, setRate]= useState('')
    const [itemDescription, setDescription]= useState("")
    const [itemCondition, setCondition]= useState("");
    const [itemCategory, setCategory]= useState("");
    const [itemImage, setImage]=useState('');

     //this would be to send data to the database
    const sendData=()=>{
        if (!itemName || !itemRate || !itemDescription || !itemCondition || !itemCategory || !itemImage) {
            alert('Please fill out all fields.');
            return;
        }

        const data=new FormData();
        data.append('name', itemName);
        data.append('rate', parseFloat(itemRate, 10));
        data.append('description', itemDescription);
        data.append('condition', itemCondition);
        data.append('category', itemCategory);
        if (itemImage) {
            data.append("url", itemImage);
          }



        fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/insertNewRent`, {
            method: 'POST',
            body: data,
          })
          .then(response => response.json())  // Parse the JSON response
          .then(data => {
            console.log('Success:', data);  // Log success data
            alert('Item inserted successfully!');  // Notify the user

          })
          .catch((error) => {
            console.error('Error:', error);  // Log any errors
            alert('Failed to insert item');
          });

        };

            
    return( 
        <>
        <Header> </Header>
        <h1 className="sellrent-title">Rent Form</h1>
        <div className="sell-form">
            <form className="listing">
            <label className="labels">Item Name: <span style={{ color: "red" }}>*</span></label>
            <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setName(e.target.value)}
            ></input>
        <br />
            <label className="labels">Item Rate per Day: <span style={{ color: "red" }}>*</span></label>
            <input
                type="number"
                required
                value={itemRate}
                onChange={(e) => setRate(e.target.value)}
            ></input>
        <br />
        <br />
        <label className="labels">Condition: <span style={{ color: "red" }}>*</span></label>
            <input
                type="text"
                required
                value={itemCondition}
                onChange={(e) => setCondition(e.target.value)}
            ></input>
        <br />
        <label className="labels">Category: <span style={{ color: "red" }}>*</span></label>
            <input
                type="text"
                required
                value={itemCategory}
                onChange={(e) => setCategory(e.target.value)}
            ></input>
        <br />
            <label className="labels">Description: <span style={{ color: "red" }}>*</span></label>
            <textarea 
                type="text"
                required            
                value={itemDescription}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
        <br />
            <label className="labels">Upload Images: </label>
            <input 
                type="file" 
                onChange={(e)=>setImage(e.target.files[0])}
            ></input>
            </form>
            {/* Submit Button */}
            <button onClick={sendData} disabled={!itemName || !itemRate || !itemDescription || !itemCondition || !itemCategory }>
                        Submit Listing
                    </button>
        </div> 
        </>
    )
}
export default RentForm