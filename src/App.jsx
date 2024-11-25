import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import UserDashboard from './pages/User/UserDashboard';
import Home from './pages/Home';
import { UserProvider, useUser } from './context/UserContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import CategoryPage from './pages/User/CategoryPage';
import AddProductForm from './Component/AddProduct/AddProductForm';
import Checkout from './Component/Checkout/Checkout';
import Dashboard from './Component/ProfileComporent/Dashboard';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';

const AppRoutes = () => {
  const { role, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const pathname = window.location.pathname;

      if (role === 'admin') {
        if (pathname !== '/admin') {
          navigate('/admin', { replace: true });
        }
      } else if (role === 'customer') {
        if (pathname !== '/user/dashboard'
          && pathname !== '/user/category'
          && pathname !== '/user/profile'
          && pathname !== '/user/checkout'
          ) {
          navigate('/user', { replace: true });
        }
      } else {
        if (pathname !== '/category') {
          navigate('/', { replace: true });
        }

      }
    }
  }, [role, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='category' element={<CategoryPage />} />
      </Route>
      <Route path="/admin/*" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboardPage />} />
      </Route>
      <Route path="/user/*" element={<ProtectedRoute roles={['customer']}><UserLayout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path='category' element={<CategoryPage />} />
        <Route path='profile' element={<Dashboard />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

function App() {
  function ScrollToTopOnPageChange() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
  }
  return (

    <UserProvider>
      <Router>
        <ScrollToTopOnPageChange />
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
