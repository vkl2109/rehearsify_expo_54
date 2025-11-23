import Button from '@/components/common/button';
import Screen from '@/components/common/screen';
import Title from '@/components/common/title';
import { StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

export default function SignInRoot() {
  return (
    <Screen>
      <View style={styles.container}>
        <Title fs={42} b>Rehearsify</Title>
        <Button 
          onPress={() => SheetManager.show('AuthSheet')}
          h={60}
          fs={24}
          r={100}
          >
          Get Started
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height:'100%'
  },
});
