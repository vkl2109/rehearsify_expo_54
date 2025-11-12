import Button from '@/components/common/button';
import { useAuthStore } from '@/context/AuthStore';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInRoot() {
  const signIn = useAuthStore(s => s.logInUser);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tab [Sign In]</Text>
      <Button onPress={() => signIn('test')}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
