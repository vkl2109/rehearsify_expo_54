import { bgDark } from '@/constants/colors';
import { useAuthStore } from '@/context/AuthStore';
import { useBandStore } from '@/context/BandStore';
import { auth, db } from '@/firebase';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../components/sheets/sheets.tsx';

// Prevent auto-hide until auth finishes
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const { logInUser, logOutUser, updateUser } = useAuthStore();
  const { setBand } = useBandStore()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUid = user.uid
        logInUser(userUid);
        const userRef = doc(db, "users", userUid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data()
            const serializedUser = {
                uid: userUid,
                email: user.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                currentBandId: userData.currentBandId,
                instruments: userData.instruments || [],
            }
            updateUser(serializedUser);

            const currentBandId = userData.currentBandId;
            if (currentBandId) {
                const bandRef = doc(db, "bands", currentBandId);
                const bandSnap = await getDoc(bandRef);
                if (bandSnap.exists()) {
                    const bandData = bandSnap.data();
                    console.log("Current band data:", bandData);
                    const serializedBand = {
                        createdAt: bandData.createdAt,
                        createdBy: bandData.createdBy,
                        name: bandData.name,
                        genre: bandData.genre,
                        lastUpdatedBy: bandData.lastUpdatedBy,
                        lastUpdatedAt: bandData.lastUpdatedAt,
                        id: bandSnap.id,
                    }
                    setBand(serializedBand);
                } else {
                    console.log("No such current band!");
                }
            }
        } else {
            console.log("No such user!");
        }
      } else {
        logOutUser();
      }
      setLoading(false)
      await SplashScreen.hideAsync()
    });

    return () => unsub();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SheetProvider>
          <StatusBar style="light" />

          {/* Only render the app AFTER loading is done */}
          {!loading && <RootNavigator />}
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const session = useAuthStore(s => s.UID);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: bgDark },
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(sign-in)" />
      </Stack.Protected>
    </Stack>
  );
}
