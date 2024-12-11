import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import ApplicationSubmit from "./Pages/ApplicationSubmit/app-submitted"
import Purchases from "./Pages/Purchases/purchases"
import Listings from "./Pages/ListItem/Listings";
import SellForm from "./Pages/ListItem/sellForm";
import RentForm from "./Pages/ListItem/rentForm";
import ItemListingPage from "./Components/ItemListingFull/itemListingPage"
import AccountApproval from "./Pages/SuperUser/accountApproval";
import SuspensionApproval from "./Pages/SuperUser/suspensionApproval";
import SuperUserDashboard from "./Pages/SuperUser/superUserDash";
import Profile from "./Pages/Profile/view_profile";
import PaymentDetails from "./Pages/Profile/PaymentDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("App state:", { isLoggedIn });
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path = "/register" element={<Register />} />
        <Route path="/app-submitted" element={<ApplicationSubmit />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/listings" element={<Listings />} /> 
        <Route path="/sell-form" element={<SellForm />} />
        <Route path="/rent-form" element={<RentForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-details" element={<PaymentDetails />} />

        <Route path="/item/:id" element={<ItemListingPage />} />

        {/* SuperUser stuff (protected routes) */}
        <Route path="/admin" element={<SuperUserDashboard />} />
        <Route path="/admin/approvals" element={<AccountApproval />} />
        <Route path="/admin/suspensions" element={<SuspensionApproval />} />
        
        {/* 404 if we try to access an invalid path */}
        <Route path="*" element={(<h1>404 - Page Not Found</h1>)} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
