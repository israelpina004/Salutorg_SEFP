import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import ApplicationSubmit from "./Pages/ApplicationSubmit/app-submitted"
import ItemListingPage from "./Components/Main/ItemListingFull/itemListingPage";
import AccountApproval from "./Pages/SuperUser/accountApproval";
import SuspensionApproval from "./Pages/SuperUser/suspensionApproval";
import SuperUserDashboard from "./Pages/SuperUser/superUserDash";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path = "/home" element={<Home/>} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
        <Route path="/app-submitted" element={<ApplicationSubmit />} />
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
