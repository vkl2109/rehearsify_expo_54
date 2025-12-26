import CurrentSongCard from "@/components/cards/CurrentSongCard";
import SongCard from "@/components/cards/SongCard";
import Screen from "@/components/common/screen";
import Title from "@/components/common/title";
import { bgLight, highlight, textColor } from "@/constants/colors";
import { SongToSetList } from "@/constants/types";
import { useAddSongToSetlistStore } from "@/context/AddSongToSetlistStore";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongStore } from "@/context/SongStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { deleteSetListAndSongs, fetchSongsToSetLists } from "@/utils/queries";
import { Feather } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";


export default function SetListView() {
    const router = useRouter()
    const currentSetList = currentSetListStore(s => s.currentSetList)
    const currentSetListId = currentSetList?.id

    if (!currentSetList) return <Screen />

    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const updateSongsToSetlists = useSongToSetListStore(s => s.updateSongsToSetLists)
    const filteredSongJoins = songsToSetLists.filter(stsl => stsl.setlistId === currentSetList?.id)
    const filteredSongIds = filteredSongJoins.map(stsl => stsl.songId)
    const songs = useSongStore(s => s.songs) || []
    const currentOpenSongId = useSongToSetListStore(s => s.currentOpenSongId)
    const setOpenSongId = useSongToSetListStore(s => s.setCurrentOpenSongId)
    const clearSongs = useAddSongToSetlistStore(s => s.clearSongs)

    const filteredSongs = filteredSongIds ? songs.filter(s => filteredSongIds.includes(s.id)) : []

    const songToJoinMap = new Map<string, SongToSetList>(filteredSongJoins.map(stsl => [stsl.songId, stsl]))

    const handleBack = () => {
        setOpenSongId('')
        router.back()
    }

    if (!currentSetList) return <Screen />

    function handleDeleteSetList() {
        Alert.alert(
            `Delete ${currentSetList?.name}?`,
            "This action cannot be undone.",
            [
                { 
                    text: "Cancel", 
                    style: "cancel" 
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            if (!currentSetList) return;
                            await deleteSetListAndSongs(currentSetList.id);
                            router.back()
                        } catch (e) {
                            console.log("Transaction failed: ", e);
                        }
                    },
                },
            ]
        );
    }

    const handleEditSetList = () => {
        SheetManager.show('EditSetlistSheet')
    }
    
    const sortedSongs = filteredSongs.sort((a, b) => {
        const orderA = songToJoinMap.get(a.id)?.order || 0;
        const orderB = songToJoinMap.get(b.id)?.order || 0;
        return orderA - orderB;
    });

    const currentSong = sortedSongs.find(s => s.id === currentOpenSongId)

    useEffect(() => {
        if (!currentSetListId) return;
        const fetchLatestJoins = async () => {
            console.log("Fetching latest joins for setlist:", currentSetListId);
            const latestJoins = await fetchSongsToSetLists(currentSetListId);
            updateSongsToSetlists(latestJoins, currentSetListId);
        }
        fetchLatestJoins().catch(console.error);
        setOpenSongId('');
    }, [currentSetListId]);

    function handleAddSong () {
        clearSongs()
        SheetManager.show('AddSongSheet')
    }

    return (
        <Screen>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
                        <Ionicons name="chevron-back" size={24} color={highlight}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEditSetList}>
                        <Title b>{currentSetList?.name}</Title>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.iconBtn} onPress={handleDeleteSetList}>
                        <Feather name="trash-2" size={24} color={highlight} />
                    </TouchableOpacity>
                </View>
                <CurrentSongCard currentSong={currentSong}/>
                {sortedSongs.length > 0 && <FlashList
                    data={sortedSongs || []}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => 
                        <SongCard song={item} 
                            songJoin={songToJoinMap.get(item.id)}
                            index={index}
                            />
                    }
                    ListFooterComponent={
                    <TouchableOpacity
                        onPress={handleAddSong}
                        style={styles.addSongCard}
                        >
                        <Feather name="plus" size={16} color={textColor} />
                        <Title fs={15}>Add Song</Title>
                    </TouchableOpacity>
                    }
                    style={styles.allSongs}
                    />}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
    iconBtn: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: bgLight,
    },
    header: {
        width: '100%',
        margin: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    allSongs: {
        width: '100%',
        height: '100%',
    },
    addSongCard: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 25,
        margin: 5,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});