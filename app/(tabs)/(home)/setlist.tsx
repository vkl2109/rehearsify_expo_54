import SongCard from "@/components/cards/SongCard";
import Screen from "@/components/common/screen";
import Title from "@/components/common/title";
import { bgLight, textColor } from "@/constants/colors";
import { SongToSetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongStore } from "@/context/SongStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";


export default function SetListView() {
    const router = useRouter()
    const currentSetList = currentSetListStore(s => s.currentSetList)

    if (!currentSetList) return <Screen />

    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const filteredSongJoins = songsToSetLists.filter(stsl => stsl.setlistId === currentSetList?.id)
    const filteredSongIds = filteredSongJoins.map(stsl => stsl.songId)
    const songs = useSongStore(s => s.songs) || []

    const filteredSongs = filteredSongIds ? songs.filter(s => filteredSongIds.includes(s.id)) : []

    const songToJoinMap = new Map<string, SongToSetList>(filteredSongJoins.map(stsl => [stsl.songId, stsl]))

    const handleBack = () => {
        router.back()
    }

    if (!currentSetList) return <Screen />
    

    return (
        <Screen>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
                        <Ionicons name="chevron-back" size={24} color={textColor}/>
                    </TouchableOpacity>
                    <Title>{currentSetList?.name}</Title>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Entypo name="dots-three-horizontal" size={24} color={textColor} />
                    </TouchableOpacity>
                </View>
                {filteredSongs.length > 0 && <FlashList
                    data={filteredSongs || []}
                    renderItem={({ item }) => <SongCard song={item} songJoin={songToJoinMap.get(item.id)}/>}
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
        backgroundColor: bgLight
    },
    header: {
        width: '100%',
        padding: 10,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    allSongs: {
        width: '100%',
        height: '100%',
    }
});