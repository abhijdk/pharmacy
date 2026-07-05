import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { DashboardLayout } from '../components/layout';
import { ProtectedRoute } from './ProtectedRoute'; // <-- Import the new guard

const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-darker">
    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
  </div>
);

const DashboardLayoutWrapper = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            {/* Everything inside here requires a valid JWT! */}
            <Route element={<DashboardLayoutWrapper />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
              {/* <Route path="/settings" element={<SettingsPage />} /> */}
            </Route>
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}