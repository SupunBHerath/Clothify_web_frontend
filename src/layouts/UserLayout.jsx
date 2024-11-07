import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Component/NaviBar/NavBar";

export default function UserLayout() {
  return (
    <div>
    <NavBar />
     <Outlet /> 
    </div>
  );
}
