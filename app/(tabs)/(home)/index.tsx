import { testSetLists } from '@/components';
import { SetListCard } from '@/components/cards/SetListCard';
import Input from '@/components/common/Input';
import Screen from '@/components/common/screen';
import Title from '@/components/common/title';
import { bgLight, border } from '@/constants/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

export default function Root() {
  const [ search, setSearch ] = useState('');
  // const { user } = useAuthStore()
  // const { setLists, addSetLists } = useSetListStore()

  // useEffect(() => {
  //   const bandId = user?.currentBandId;
  //   if (!bandId) return;
  // },[user])

  // const filteredSetlists = search != '' ? setLists.filter(sl => 
  //   sl.name.toLowerCase().includes(search.toLowerCase())
  // ) : setLists;
  return (
    <Screen>
      <View style={styles.header}>
        <Input
          icon={<FontAwesome name="search" size={24} color={border} />}
          placeholder="search"
          input={search}
          setInput={setSearch}
          w="80%"
          />
        <TouchableOpacity style={styles.filterButton} onPress={() => SheetManager.show('FilterSheet')}>
          <Ionicons name="filter" size={24} color={border} />
        </TouchableOpacity>
      </View>
      <FlashList
        data={testSetLists}
        ListHeaderComponent={<Title m={10}>My Set Lists</Title>}
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
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  searchBarWrapper: {
    margin: 10,
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: 'none',
    borderRadius: 100,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: bgLight
  },
  focusedBar: {
    borderColor: border
  },
  searchBar: {
    flex: 1,
    height: '100%',
    fontSize: 24,
    marginLeft: 10,
  },
  filterButton: {
    borderRadius: 100,
    backgroundColor: bgLight,
    padding: 10,
  }
});
