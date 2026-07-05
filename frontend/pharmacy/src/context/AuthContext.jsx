import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('CRED_JWT');
    const savedUser = localStorage.getItem('CRED_USER');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    setIsInitializing(false);
  }, []);

  // Login Action
  const login = (jwt, userData) => {
    localStorage.setItem('CRED_JWT', jwt);
    localStorage.setItem('CRED_USER', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout Action
  const logout = () => {
    localStorage.removeItem('CRED_JWT');
    localStorage.removeItem('CRED_USER');
    setUser(null);
    setIsAuthenticated(false);
    // Force a hard redirect to clear all memory states
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isInitializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}