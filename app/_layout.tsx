import { bgDark } from '@/constants/colors';
import { SplashScreenController } from '@/context';
import { useAuthStore } from '@/context/AuthStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../components/sheets/sheets.tsx';


export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SafeAreaProvider>
        <GestureHandlerRootView>
            <SheetProvider>
                <StatusBar style="light" />
                <SplashScreenController />  
                <RootNavigator />
            </SheetProvider>
        </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
    const session = useAuthStore(s => s.UID);

    return (
        <Stack screenOptions={{ 
            headerShown: false,
            contentStyle: {
                backgroundColor: bgDark
            }
            }}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="(sign-in)" />
            </Stack.Protected>
        </Stack>
    );
}
