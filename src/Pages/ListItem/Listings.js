import Header from "../../Components/Header/header";
import { Link } from "react-router-dom";
import React, {useState} from 'react';
import './listing.css';

const Listings=()=> {
    
//should get most of these stuff from database
    const [Items, setItems]=useState([]);

    const addPurchase=()=>{
        const newPurchase={
            image: 1,
            id: 1,
            name: 'Coat',
            description: 'Long, Blue',
            condition: 'New',
            startingPrice: '$70.99',
            listedPrice: '100',
            category: 'Outerwear',
            startDate: Date(),
            endDate: Date(),
        };
        setItems((prevPurchases) => [newPurchase, ...prevPurchases]);            
    }
    const itemsList=Items.map(item =>
        <div className='purchase'>
            <img className="purchase-image" src="https://picsum.photos/200" alt="Item" />
            <div className='purchase-info'>
                <li key={item}>
                    <b>Listing Title:</b> {item.name} <br />
                    <b>Condition:</b> {item.condition} <br />
                    <b>Starting Price:</b> {item.startingPrice} <br />
                    <b>Listed Price:</b> US${item.listedPrice} <br />
                    <b>Category:</b> {item.category} <br />
                    <b>Bidding Start Date:</b> {item.startDate} <br />
                    <b>Bidding End Date:</b> {item.endDate}

                    
                    
                    </li>
                <button className='edit -listing-button'>Edit Listing</button>            
            </div>            
        </div>
    )

        
        return(
            <>
            <Header></Header>
            <h1 className="listings-title"><b>Listings</b></h1>
            <div className="list-button">
            <Link to="/sell-form"><button className="rent_sell-button">Sell an Item</button></Link>
            <Link to="/rent-form">< button className="rent_sell-button">Rent an Item</button></Link>
            </div>

            <div>
                <button onClick={addPurchase}> Add Purchase</button>
            </div>
            <div>
                <ul>{itemsList}</ul>
            </div>


            </>
        )
}
export default Listings 
