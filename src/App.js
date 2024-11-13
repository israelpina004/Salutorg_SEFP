import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Header from "./Components/Header/header";
import MainContent from "./Components/Main/MainContent";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <MainContent />
      <Routes>
        <Route path = "/" exact={true} element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
