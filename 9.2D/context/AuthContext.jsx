import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../Firebase/firebase-config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { getPremiumStatus, isPremium as localIsPremium } from '../utils/premium';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [premium, setPremium] = useState(localIsPremium());

  useEffect(() => {
    let mounted = true;

    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn('Failed to enforce auth persistence:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;
      setUser(firebaseUser);

      if (firebaseUser?.email) {
        try {
          const flag = await getPremiumStatus(firebaseUser.email);
          if (mounted) setPremium(flag);
        } catch (err) {
          console.warn('Failed to refresh premium status after auth change:', err);
          if (mounted) setPremium(localIsPremium());
        }
      } else if (mounted) {
        setPremium(localIsPremium());
      }

      if (mounted) setLoading(false);
    });

    const handlePremiumChange = (event) => {
      if (!mounted) return;
      const { isPremium } = event.detail || {};
      if (typeof isPremium === 'boolean') {
        setPremium(isPremium);
      } else {
        setPremium(localIsPremium());
      }
    };

    window.addEventListener('premiumChanged', handlePremiumChange);

    return () => {
      mounted = false;
      unsubscribe();
      window.removeEventListener('premiumChanged', handlePremiumChange);
    };
  }, []);

  const refreshPremium = useCallback(async () => {
    if (user?.email) {
      const flag = await getPremiumStatus(user.email);
      setPremium(flag);
      return flag;
    }
    const fallback = localIsPremium();
    setPremium(fallback);
    return fallback;
  }, [user?.email]);

  const login = useCallback((email, password) => (
    signInWithEmailAndPassword(auth, email, password)
  ), []);

  const register = useCallback((email, password) => (
    createUserWithEmailAndPassword(auth, email, password)
  ), []);

  const logout = useCallback(() => (
    signOut(auth)
  ), []);

  const value = useMemo(() => ({
    user,
    loading,
    isPremium: premium,
    login,
    register,
    logout,
    refreshPremium
  }), [user, loading, premium, login, register, logout, refreshPremium]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
