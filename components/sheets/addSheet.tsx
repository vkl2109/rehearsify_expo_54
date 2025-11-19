import { bgLight, borderMuted, secondary } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../common/button';

function AddSheet() {
    const insets = useSafeAreaInsets();
    return (
        <ActionSheet 
            containerStyle={styles.container}
            indicatorStyle={styles.indicatorStyle}
            safeAreaInsets={insets}
            gestureEnabled
            >
            <View style={styles.sheet}>
                <Button onPress={() => {}}>New Song</Button>
                <Button onPress={() => {}} c={secondary}>New Set List</Button>
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    paddingTop: 5,
  },
  sheet: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 0,
  },
  indicatorStyle: {
    width: 75,
    backgroundColor: borderMuted,
  }
});
 
export default AddSheet;