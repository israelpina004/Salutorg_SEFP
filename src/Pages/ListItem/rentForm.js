import { useState } from "react";
import Header from "../../Components/Header/header";
import './form.css';

const RentForm=()=> {

    const [itemName, setName]= useState('')
    const [itemPrice, setPrice]= useState('')
    const [itemDeadline, setDeadline]= useState('')
    const [itemDescription, setDescription]= useState("")

    const sendData=()=>{
        /*   
        This is to send the inputted info to the purchases page                
            <Updatelistings name={itemName} price={itemPrice}> </Updatelistings>
        */
    }
            
    return( 
        <>
        <Header> </Header>
        <h1>Rent</h1>
        <div className="list">
            <form className="listing">
            <label className="labels">Item Name: </label>
            <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setName(e.target.value)}
            ></input>
        <br />
            <label >Item Rate per Day: </label>
            <input
                type="number"
                required
                value={itemPrice}
                onChange={(e) => setPrice(e.target.value)}
            ></input>
        <br />
            <label className="labels">Description: </label>
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
            ></input>
            </form>
            <button onclick={sendData}>Submit Listing</button>
        </div> 
        </>
    )
}
export default RentForm