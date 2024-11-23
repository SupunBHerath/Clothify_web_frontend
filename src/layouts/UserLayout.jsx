import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Component/NaviBar/NavBar";
import Footer from "../Component/Footer/Footer";

export default function UserLayout() {
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
        {/* <Footer /> */}
      </footer>
    </div>


  );
}
