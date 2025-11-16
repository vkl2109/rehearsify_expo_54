import { SetListCard } from '@/components/cards/SetListCard';
import Screen from '@/components/common/screen';
import Title from '@/components/common/title';
import { useSetListStore } from '@/context/SetListStore';
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from 'react-native';

export default function Root() {
  const setLists = useSetListStore(s => s.setLists)
  return (
    <Screen>
      <FlashList
        data={setLists}
        ListHeaderComponent={<Title>My Set Lists</Title>}
        ListHeaderComponentStyle={styles.header}
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
  },
  header: {
    padding: 10,
  }
});
