import React from "react";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import MyRouter from "./router/index.js";
import Navbar from "./components/Navbar.js";
function App() {
  return (
    <div>
    {/* <Link to="/">Home</Link>
    <Link to="/about-us">About Us</Link>
    <Link to="/contact-us">Contact Us</Link> */}


    <Navbar />
    <MyRouter />
    </div>
  );
}

export default App;
