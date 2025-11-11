import { Stack } from 'expo-router';


export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <RootNavigator />
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
    const session = null; // Replace with actual session logic

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
