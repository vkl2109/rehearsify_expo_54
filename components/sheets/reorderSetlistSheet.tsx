import { bgLight, border, borderMuted, primary, textColor } from "@/constants/colors";
import { SongToSetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongStore } from "@/context/SongStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { Feather } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef, FlatList } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReorderSongCard } from "../cards/ReorderSongCard";
import Button from "../common/button";
import Title from "../common/title";


function ReorderSetlistSheet() {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const insets = useSafeAreaInsets();
    const disabled = true;

    const currentSetList = currentSetListStore(s => s.currentSetList)
    const currentSetListId = currentSetList?.id ?? ''

    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const updateSongsToSetlists = useSongToSetListStore(s => s.updateSongsToSetLists)
    const filteredSongJoins = songsToSetLists.filter(stsl => stsl.setlistId === currentSetListId)
    const filteredSongIds = filteredSongJoins.map(stsl => stsl.songId)
    const songs = useSongStore(s => s.songs) || []

    const filteredSongs = filteredSongIds ? songs.filter(s => filteredSongIds.includes(s.id)) : []

    const songToJoinMap = new Map<string, SongToSetList>(filteredSongJoins.map(stsl => [stsl.songId, stsl]))

    const positions = new Map<string, number>(filteredSongJoins.map(stsl => [stsl.songId, stsl.order]));

    
    const sortedSongs = filteredSongs.sort((a, b) => {
        const orderA = songToJoinMap.get(a.id)?.order || 0;
        const orderB = songToJoinMap.get(b.id)?.order || 0;
        return orderA - orderB;
    });
    
    const moveItem = (id: string, from: number, to: number) => {
        const updated = [...sortedSongs]
        const moved = updated.splice(from, 1)[0]
        updated.splice(to, 0, moved)

        // update order fields
        // updated.forEach((item, i) => (item.order = i))

        // onReorder(updated)
    }

    function handleSaveOrder () {

    }
    return(
        <ActionSheet
            containerStyle={styles.container}
            indicatorStyle={styles.indicatorStyle}
            safeAreaInsets={insets}
            gestureEnabled
            ref={actionSheetRef}
            >
            <View style={styles.sheet}>
                <View style={styles.addHeader}>
                    <Title fw={100} m={5}>Order</Title>
                </View>
                <FlatList
                    data={sortedSongs}
                    renderItem={({ item }) => <ReorderSongCard song={item} positions={positions} moveItem={moveItem} />}
                    keyExtractor={(item) => item.id}
                    />
                <Button
                    onPress={handleSaveOrder}
                    disabled={disabled}
                    c={disabled ? borderMuted : primary}
                    style={{ marginVertical: 10 }}
                    icon={<Feather name="upload" size={20} color={textColor} />}
                    >
                    Save Changes
                </Button>
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgLight,
    paddingTop: 5,
  },
  sheet: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  addHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: border,
    marginBottom: 10,
  },
  indicatorStyle: {
    width: 75,
    backgroundColor: borderMuted,
  }
});

export default ReorderSetlistSheet