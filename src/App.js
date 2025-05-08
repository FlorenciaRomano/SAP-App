import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import UserList from './components/Dashboard/UserList';
import UserProfile from './components/Dashboard/UserProfile';
import Navbar from './components/Layout/Navbar';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/dashboard" replace />;
  return children;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <div className='ContainerGral'>
      {location.pathname !== '/login' && <Navbar />}
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
      <style>{`
        .app-container {
          padding: 1rem;
        }
      `}</style>
    </AuthProvider>
  );
}

export default App;
