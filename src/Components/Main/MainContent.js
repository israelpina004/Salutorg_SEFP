import React from "react";
import ItemListing from "./Listing/ItemListing";  
import "./MainContent.css";  

const MainContent = () => {
    return (
        <div className="main-content">
            <div className="main-page-container">
                <h1>Row #1</h1>
                <div className="main-page-row">
                    
                    <ItemListing />  
                    <ItemListing />
                    <ItemListing />
                    <ItemListing />
                    <ItemListing />
                </div>
                <h1>Row #2</h1>
                <div className="main-page-row">
                    
                    <ItemListing />  
                    <ItemListing />
                    <ItemListing />
                    <ItemListing />
                    <ItemListing />
                </div>
            </div>
        </div>
    );
}

export default MainContent;