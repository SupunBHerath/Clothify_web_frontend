import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import GuestLayout from './layouts/GuestLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import Home from './pages/Home';
import { UserProvider, useUser } from './context/UserContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import CategoryPage from './pages/User/CategoryPage';

const AppRoutes = () => {
  const { role, loading } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading) {
      const pathname = window.location.pathname;

      if (role === 'admin') {
        if (pathname !== '/admin/dashboard') {
          navigate('/admin/dashboard', { replace: true });
        }
      } else if (role === 'customer') {
        if (pathname !== '/user/dashboard' && pathname !== '/user/d') {
          navigate('/user/dashboard', { replace: true });
        }
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [role, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<CategoryPage />} />
      </Route>
      <Route path="/admin/*" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/user/*" element={<ProtectedRoute roles={['customer']}><UserLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="d" element={<AdminDashboard />} /> 
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
