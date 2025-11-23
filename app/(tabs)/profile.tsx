import Button from '@/components/common/button';
import { useAuthStore } from '@/context/AuthStore';
import { StyleSheet, View } from 'react-native';

export default function Profile() {
  const signOut = useAuthStore(s => s.logOutUser);

  const handleSignOut = () => {
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
