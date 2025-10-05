import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function SignOutButton() {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;
  return (
    <button onClick={logout}>
      Sign Out
    </button>
  );
}
