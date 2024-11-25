import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Component/NaviBar/NavBar";
import Footer from "../Component/Footer/Footer";
import { useLocation } from "react-router-dom";
export default function UserLayout() {
  const location = useLocation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header style={{ flexShrink: 0, }}>
        <NavBar />
      </header>
      
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer
        style={{
          flexShrink: 0,
          
        }}
      >
        <br />
        {location.pathname !== "/profile" && <Footer />}
      </footer>
    </div>


  );
}
