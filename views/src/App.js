// import logo from './logo.svg';
import './App.css';
import Index from "./pages/main";
import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {Box, CssBaseline, } from '@mui/material';
import create from "zustand";
import axios from "axios";

import SignIn from "./pages/login";
import MapComponent from "./components/Map";
import NotImplemented from "./components/NotImplemented";
import ProfileComponent from "./components/Profile";
import Calendar from "./components/Calendar";
import WalletComponent from "./components/Wallet";
import ParkingComponent from "./components/Parking";
import ChargingComponent from "./components/Charging";
import DrawerComponent from "./components/DrawerComponent";
import Navbar from "./components/Navbar";
import PostPayment from "./pages/post-payment";

const option = localStorage.getItem('component-name')
const components = {Calendar, ProfileComponent, WalletComponent, ParkingComponent, ChargingComponent, MapComponent, NotImplemented};

let Component;
if (option !== null) Component = components[option];
else Component = components['MapComponent'];
// const open = false;

export const useStore = create((set) => ({
    component: <Component/>,
    option: option,
    open: false,
    dialog: false,
    ticket: false,
    ticketType: "",
    price: 0,
    success: false,
    error: false,
    balance: 0,
    // component: <MapComponent/>,
    setOption: (option) => set({option}),
    setComponent: (component) => set({component}),
    setOpen: (open) => set({open}),
    setDialog: (dialog) => set({dialog}),
    setTicket: (ticket) => set({ticket}),
    setPrice: (price) => set({price}),
    setTicketType: (ticketType) => set({ticketType}),
    setSuccess: (success) => set({success}),
    setError: (error) => set({error}),
    setBalance: (balance) => set({balance}),
}));


function App() {
    const location = useLocation();

    let navbar = null;
    if (location.pathname !== "/login")
        navbar = <Navbar/>

  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}

        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/wallet" element={<WalletComponent/>}/>
            <Route path="/history" element={<NotImplemented/>}/>
            <Route path="/news" element={<NotImplemented/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/profile" element={<ProfileComponent/>}/>
            <Route path="/payment/:amount" element={<PostPayment/>}/>
            <Route path="/login" element={<SignIn/>}/>
        </Routes>
        <Box>
            <CssBaseline />
            {navbar}
            <DrawerComponent/>
        </Box>
        {/*<Index>
      </Index>*/}
    </div>
  );
}

export default App;
