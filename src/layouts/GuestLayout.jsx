import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/NaviBar/NavBar";
import Footer from "../Component/Footer/Footer";

const GuestLayout = () => (
  <div>
    <Navbar />
    <Outlet />
    <div className="footer mt-5">
      <Footer />
    </div>
  </div>
);

export default GuestLayout;
