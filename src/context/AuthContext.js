import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (token) {
          try {
            const userData = JSON.parse(atob(token)); // Decodifica todo el token que se guardó con btoa
            setUser(userData);
            setRole(userData.role);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error al decodificar el token:', error);
            logout();
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setRole(null);
        }
      }, [token]);

    const login = (token) => {
        sessionStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setUser (null);
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};