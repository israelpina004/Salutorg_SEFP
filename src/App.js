import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home"
import Header from "./Components/Header";
import MainLayout from "./Components/MainLayout";

function App() {
  return (
    <>
    <BrowserRouter>
      <MainLayout />
      <Header />
      <Routes>
        <Route path = "/" exact={true} element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
