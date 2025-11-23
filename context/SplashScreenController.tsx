import { auth } from '@/firebase';
import { SplashScreen } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthStore } from './AuthStore';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const [ loading, setLoading ] = useState(true);
  const { logInUser, logOutUser } = useAuthStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // Update Zustand store with current user
      if (user) {
        logInUser(user.uid)
      } else {
        logOutUser()
      }
      setLoading(false)
    });

    return () => unsub();
  }, []);

  if (!loading) {
    SplashScreen.hide();
  }

  return null;
}