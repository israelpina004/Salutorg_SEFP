import Header from "../../Components/Header/header";
import { Link } from "react-router-dom";
import React, {useState} from 'react';

const Listings=()=> {
    const [Items, setItems]=useState([]);

    /*This is to probably update the purchases page
    const Updatelistings=(prop)=>{
        const newlisting={
        }
    }*/
        return(
            <>
            <Header></Header>
            <h1>Listings</h1>
            <Link to="/sell-form"><button>Sell an Item</button></Link>
            <Link to="/rent-form"><button>Rent an Item</button></Link>

            </>
        )
}
export default Listings 
