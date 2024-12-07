//import { Link } from "react-router-dom";
import React, {useState} from 'react';
import './purchases.css'
import Header from "../../Components/Header/header";

    const Purchases=()=> {
        const [Items, setItems]=useState([]);

        const addPurchase=()=>{
            const newPurchase={
                image: 1,
                id: 1,
                name: "Item Name",
                price: 70.99,
                date: Date(),
            };
            setItems((prevPurchases) => [newPurchase, ...prevPurchases]);            
        }
        const itemsList=Items.map(item =>
            <div className='purchase'>
                <img className="purchase-image" src="https://picsum.photos/200" alt="Item" />
                <div className='purchase-info'>
                    <li key={item}>Order Number: {item.id} <br />{item.name} <br /> US ${item.price} <br /> Order Date: {item.date}</li>
                    <button className='rate-seller-button'>Rate Seller</button>            
                </div>            
            </div>)

        return(
            <>
            <Header>Header</Header>
            <h1 className='title22222'>Purchase History</h1>
            <div>
                <button onClick={addPurchase}> Add Purchase</button>
            </div>
            <div>
                <ul>{itemsList}</ul>
            </div>
            </>
        )
    }
export default Purchases;
