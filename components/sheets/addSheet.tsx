import { bgLight, borderMuted, secondary, textColor } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../common/button';

function AddSheet() {
    const insets = useSafeAreaInsets();
    const router = useRouter()

    const handleNewSong = () => {
        router.push('/(tabs)/(home)/addSong')
        SheetManager.hide('AddSheet')
    }
    return (
        <ActionSheet 
            containerStyle={styles.container}
            indicatorStyle={styles.indicatorStyle}
            safeAreaInsets={insets}
            gestureEnabled
            >
            <View style={styles.sheet}>
                <Button 
                  onPress={handleNewSong}
                  icon={<Ionicons name="musical-notes" size={20} color={textColor} />}
                  >
                  New Song
                </Button>
                <Button 
                  onPress={() => {}} 
                  c={secondary}
                  icon={<Ionicons name="list" size={20} color={textColor} />}
                  >
                  New Set List
                </Button>
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