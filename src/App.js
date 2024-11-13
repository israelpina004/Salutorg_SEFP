import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path = "/home" element={<Home/>} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
