import Button from '@/components/common/button';
import { useAuthStore } from '@/context/AuthStore';
import { auth } from '@/firebase';
import { StyleSheet, View } from 'react-native';

export default function Profile() {
  const signOut = useAuthStore(s => s.logOutUser);

  const handleSignOut = async () => {
    await auth.signOut()
    signOut()
  }
  return (
    <View style={styles.container}>
      <Button onPress={handleSignOut}>Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
