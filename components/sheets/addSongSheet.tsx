import { bgLight, border, borderMuted, primary, textColor } from "@/constants/colors";
import { useAddSongToSetlistStore } from "@/context/AddSongToSetlistStore";
import { useAuthStore } from "@/context/AuthStore";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongStore } from "@/context/SongStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { addSongsToCurrentSetlist, fetchSongsToSetLists } from "@/utils/queries";
import { Feather } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef, FlatList } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddSongSetListCard } from "../cards/AddSongSetListCard";
import Button from "../common/button";
import Title from "../common/title";


function AddSongSheet() {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const insets = useSafeAreaInsets();
    const currentSetList = currentSetListStore(s => s.currentSetList)
    const allSongs = useSongStore(s => s.songs) || []
    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const filteredSongJoins = songsToSetLists.filter(stsl => stsl.setlistId === currentSetList?.id)
    const filteredSongIds = filteredSongJoins.map(stsl => stsl.songId)
    const notPresentSongs = allSongs.filter(s => !filteredSongIds.includes(s.id))
    const selectedSongIds = useAddSongToSetlistStore(s => s.songsToAdd)
    const updateSongsToSetlists = useSongToSetListStore(s => s.updateSongsToSetLists)
    const disabled = selectedSongIds.size === 0
    const currentSetListId = currentSetList?.id
    const currentBandId = useAuthStore(s => s.user?.currentBandId)

    const handleAddSongsToSetList = async () => {
        try {
            if (!currentSetListId || !currentBandId) return;

            const newSongIds = Array.from(selectedSongIds);
            if (!newSongIds.length) return;

            await addSongsToCurrentSetlist(newSongIds, currentSetListId, currentBandId);

            const newJoins = await fetchSongsToSetLists(currentSetListId);

            updateSongsToSetlists(newJoins, currentSetListId);

            actionSheetRef.current?.hide();
        } catch (e) {
            console.log(e)
        }
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
                    <Title fw={100} m={5}>Songs</Title>
                </View>
                <FlatList
                    data={notPresentSongs}
                    renderItem={({ item }) => <AddSongSetListCard song={item} />}
                    />
                <Button 
                    onPress={handleAddSongsToSetList}
                    disabled={disabled}
                    c={disabled ? borderMuted : primary}
                    style={{ marginVertical: 10 }}
                    icon={<Feather name="plus" size={20} color={textColor} />}
                    >
                    Add to Set List
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

export default AddSongSheet;