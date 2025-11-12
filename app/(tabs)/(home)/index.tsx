import { testSetLists } from '@/components';
import Screen from '@/components/common/screen';
import { SetListCard } from '@/components/SetListCard';
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from 'react-native';

export default function Root() {
  return (
    <Screen>
      <FlashList
        data={testSetLists}
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
