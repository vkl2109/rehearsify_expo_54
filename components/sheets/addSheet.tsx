import { bgLight, borderMuted, textColor } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from '../common/title';

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
                <TouchableHighlight
                  style={styles.addCard}
                  onPress={handleNewSong}
                  >
                  <View style={styles.innerCard}>
                    <View style={styles.iconWrapper}>
                      <Ionicons name="musical-notes" size={20} color={textColor} />
                    </View>
                    <Title>New Song</Title>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight 
                  style={styles.addCard}
                  onPress={() => {}}
                  >
                  <View style={styles.innerCard}>
                    <View style={styles.iconWrapper}>
                      <Ionicons name="list" size={20} color={textColor} />
                    </View>
                    <Title>New Set List</Title>
                  </View>
                </TouchableHighlight>
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    paddingTop: 5,
    paddingHorizontal: 5,
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
  },
  addCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  innerCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
    backgroundColor: borderMuted,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
 
export default AddSheet;