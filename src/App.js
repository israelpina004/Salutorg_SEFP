import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Header from "./Components/Header/header";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path = "/" exact={true} element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
