import { bgLight, border } from '@/constants/colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../common/button';
import Title from '../common/title';

function FilterSheet() {
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    SheetManager.hide("FilterSheet");
  }

  return (
    <ActionSheet
        containerStyle={styles.container}
        safeAreaInsets={insets}
        >
      <View style={styles.sheet}>
        <View style={styles.header}>
          <Title fw={100} m={5}>Sort</Title>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btn}>
            <Title >Descending</Title>
          </TouchableOpacity>
        </View>
        <Button 
          w={"100%"} 
          h={30} 
          p={0} 
          fs={16} 
          c={border}
          onPress={handleClose}
          >
          Close
        </Button>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
  },
  sheet: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  header: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: border,
    marginBottom: 10,
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    height: 'auto'
  }
});
 
export default FilterSheet;