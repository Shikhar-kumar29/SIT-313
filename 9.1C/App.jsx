import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './9.1C/context/AuthContext';
import LoginPage from './9.1C/pages/LoginPage';
import HomePage from './9.1C/pages/HomePage';
import SignupPage from './9.1C/pages/SignupPage';
import ProtectedRoute from './9.1C/components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
