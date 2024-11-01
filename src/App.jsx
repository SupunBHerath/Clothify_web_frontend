import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import GuestLayout from './layouts/GuestLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Home />} /> 
          </Route>

          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="/user" element={<ProtectedRoute roles={['customer']}><UserLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
