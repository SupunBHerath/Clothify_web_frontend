import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Component/NaviBar/NavBar";
import Footer from "../Component/Footer/Footer";

export default function UserLayout() {
  return (
    <div>
    <NavBar />
     <Outlet /> 
     <br /><br />
     <Footer />

    </div>
  );
}
