import { SetListCard } from '@/components/cards/SetListCard';
import Screen from '@/components/common/screen';
import Title from '@/components/common/title';
import { bgLight, border, textColor } from '@/constants/colors';
import { useSetListStore } from '@/context/SetListStore';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlashList } from "@shopify/flash-list";
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function Root() {
  const [ search, setSearch ] = useState('');
  const setLists = useSetListStore(s => s.setLists)
  const [ isFocused, setIsFocused ] = useState(false);

  const filteredSetlists = search != '' ? setLists.filter(sl => 
    sl.name.toLowerCase().includes(search.toLowerCase())
  ) : setLists;
  return (
    <Screen>
      <View style={styles.header}>
        <View style={[styles.searchBarWrapper, isFocused && styles.focusedBar]}>
          <FontAwesome name="search" size={24} color={border} />
          <TextInput 
            placeholder="search"
            onChangeText={newText => setSearch(newText)}
            defaultValue={search}
            placeholderTextColor={border}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.searchBar, {
              color: textColor,
            }]}
            />
            {search != '' && <TouchableOpacity onPress={() => setSearch('')}>
              <Entypo name="cross" size={24} color={border} />
            </TouchableOpacity>}
        </View>
      </View>
      <FlashList
        data={filteredSetlists}
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
  },
  searchBarWrapper: {
    margin: 10,
    padding: 10,
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
  }
});
