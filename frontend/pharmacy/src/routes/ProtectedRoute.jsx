import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();

  // 1. Wait for React to finish checking local storage
  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-darker">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // 2. If they are not logged in, kick them out to the login page
  if (!isAuthenticated) {
    // 'replace' ensures this failed navigation isn't saved in browser history
    return <Navigate to="/login" replace />;
  }

  // 3. If they are authenticated, allow them to pass through to the child route
  return <Outlet />;
}