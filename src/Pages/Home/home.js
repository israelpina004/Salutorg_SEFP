import Header from "../../Components/Header/header"
import MainContent from "../../Components/Main/MainContent";
import React, { useState } from "react";
import Login from "../Login/login.js";
import CommentSection from "../../Components/CommentSection/commentSection.js";

const Home =({ isLoggedIn, setIsLoggedIn })=> {
 
    return (
    <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <MainContent />
        <CommentSection/>
    </>
    )
}

export default Home;