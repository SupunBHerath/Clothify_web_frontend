import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import NavBar from "../Component/NaviBar/NavBar";

const GuestLayout = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <header style={{ flexShrink: 0 }}>
      <NavBar />
    </header>
    <main style={{ flex: 1, }}>
      <Outlet />
    </main>
    <footer
      style={{
        flexShrink: 0,
      }}
    >
   {location.pathname !== "/profile" && <Footer />}
    </footer>
  </div>
);

export default GuestLayout;
