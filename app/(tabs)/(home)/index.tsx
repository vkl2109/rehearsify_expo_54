import { SetListCard } from '@/components/cards/SetListCard';
import SongCard from '@/components/cards/SongCard';
import Input from '@/components/common/Input';
import Screen from '@/components/common/screen';
import Title from '@/components/common/title';
import { bgLight, border } from '@/constants/colors';
import { SetList, Song } from '@/constants/types';
import { useAuthStore } from '@/context/AuthStore';
import { useSetListStore } from '@/context/SetListStore';
import { useSongStore } from '@/context/SongStore';
import { fetchSetListsForBand, fetchSongsForBand } from '@/utils/queries';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';


type HeaderItem = {
  title: string;
  type: 'header';
}

type SetListItem = SetList & { type: 'setlist' };
type SongItem = Song & { type: 'song' };

type Section = HeaderItem | SetListItem | SongItem;

export default function Root() {
  const [ search, setSearch ] = useState('');
  const user  = useAuthStore(s => s.user)
  const setLists = useSetListStore(s => s.setLists)
  const addSetLists = useSetListStore(s => s.addSetLists)
  const songs = useSongStore(s => s.songs)
  const addSongs = useSongStore(s => s.addSongs)

  useEffect(() => {
    const bandId = user?.currentBandId;
    if (!bandId) return;
    if (setLists.length === 0) fetchSetListsForBand(bandId).then(addSetLists)
    if (songs.length === 0) fetchSongsForBand(bandId).then(addSongs)
  },[user])

  const filteredSetlists = search != '' 
  ? setLists.filter(sl => sl?.name?.toLowerCase().includes(search.toLowerCase()))
  : setLists || [];

  const filteredSongs = search != '' ? songs.filter(s => 
    s?.title?.toLowerCase().includes(search.toLowerCase()) ||
    s?.artist?.toLowerCase().includes(search.toLowerCase())
  ) : songs || [];

  const setlistsAndSongs: Section[] = [
    {
      title: 'My Set Lists',
      type: 'header',
    },
    ...filteredSetlists.map(sl => ({...sl, type: 'setlist' as const})),
    {
      title: 'My Songs',
      type: 'header',
    },
    ...filteredSongs.map(s => ({...s, type: 'song' as const})),
  ]
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
        data={setlistsAndSongs}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'setlist':
              return <SetListCard setList={item}/>
            case 'song':
              return <SongCard song={item}/>
            case 'header':
              return <Title m={10}>{item.title}</Title>
            default:
              return null;
          }
        }}
        style={styles.allSetLists}
        getItemType={(item) => item.type}
        />
    </Screen>
  );
}

const styles = StyleSheet.create({
  allSetLists: {
    width: '100%',
    height: 'auto',
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
