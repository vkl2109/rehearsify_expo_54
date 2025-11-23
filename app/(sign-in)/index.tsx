import Button from '@/components/common/button';
import Screen from '@/components/common/screen';
import { StyleSheet } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

export default function SignInRoot() {
  return (
    <Screen>
      <Button onPress={() => SheetManager.show('AuthSheet')}>Press Me</Button>
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
