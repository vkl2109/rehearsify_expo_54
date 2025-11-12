import Button from '@/components/common/button';
import Screen from '@/components/common/screen';
import { useAuthStore } from '@/context/AuthStore';
import { StyleSheet, Text } from 'react-native';

export default function SignInRoot() {
  const signIn = useAuthStore(s => s.logInUser);
  return (
    <Screen>
      <Text>Tab [Sign In]</Text>
      <Button onPress={() => signIn('test')}/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
