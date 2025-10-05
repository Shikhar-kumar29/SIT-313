import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Home Page</h1>
        <p>Welcome {user?.email || "User"}!</p>
      </div>
    </>
  );
}
