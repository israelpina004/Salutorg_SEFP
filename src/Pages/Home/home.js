import Header from "../../Components/Header/header"
import MainContent from "../../Components/Main/MainContent";
import React, { useState } from "react";
import Login from "../Login/login.js";

const Home =({ isLoggedIn, setIsLoggedIn })=> {
 
    return (
    <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <MainContent />
    </>
    )
}

export default Home;