import React, { useState } from "react";
import "./App.css";
import Register from "./Pages/Register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import Navbar from "./components/Navbar";
import Home from "./Pages/Home"
import CarSearch from "./Pages/CarSearch";
import CarDetails from "./Pages/CarDetails";
import BookingDone from "./BookingDone";
import Profile from "./Profile";
import MyOrders from "./Pages/MyOrders";
import Drivers from "./Drivers";

function App() {

    return (
      <>
     
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/search" element={<CarSearch/>}/>
        <Route path="/booking/:id" element={<CarDetails/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/success/:id" element={<BookingDone/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/orders/:id" element={<MyOrders/>}/>
        <Route path="/drivers" element={<Drivers/>}/>









      </Routes>
    </BrowserRouter>
    
      </>
    )
  }

export default App;
