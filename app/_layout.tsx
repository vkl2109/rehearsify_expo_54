import { SplashScreenController } from '@/context';
import { useAuthStore } from '@/context/AuthStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SafeAreaProvider>
        <StatusBar style="light" />
        <SplashScreenController />  
        <RootNavigator />
    </SafeAreaProvider>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
    const session = useAuthStore(s => s.UID);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="(sign-in)" />
            </Stack.Protected>
        </Stack>
    );
}
