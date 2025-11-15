import { SetListCard } from '@/components/cards/SetListCard';
import Screen from '@/components/common/screen';
import { useSetListStore } from '@/context/SetListStore';
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from 'react-native';

export default function Root() {
  const setLists = useSetListStore(s => s.setLists)
  return (
    <Screen>
      <FlashList
        data={setLists}
        renderItem={({ item }) => <SetListCard setList={item}/>}
        style={styles.allSetLists}
        />
    </Screen>
  );
}

const styles = StyleSheet.create({
  allSetLists: {
    width: '100%',
    height: '100%',
  }
});
