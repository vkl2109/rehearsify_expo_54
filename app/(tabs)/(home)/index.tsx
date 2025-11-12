import { testSetLists } from '@/components';
import SetListCard from '@/components/SetListCard';
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={testSetLists}
        renderItem={({ item }) => <SetListCard setList={item}/>}
        style={styles.allSetLists}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allSetLists: {
    width: '100%',
    height: '100%',
  }
});
