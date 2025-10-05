import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const email = localStorage.getItem('userEmail');
      setUser({ email });
    }
  }, []);

  const signup = ({ email, password }) => {
    // store fake user in localStorage
    const existing = JSON.parse(localStorage.getItem('users') || '[]');
    if (existing.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    existing.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existing));
    alert('Signup successful! Please login now.');
    navigate('/login');
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const match = users.find(u => u.email === email && u.password === password);
    if (!match) throw new Error('Invalid email or password');
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('userEmail', email);
    setUser({ email });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
