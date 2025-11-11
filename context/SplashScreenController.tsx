import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const isLoading = false

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}