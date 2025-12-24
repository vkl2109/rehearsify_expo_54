import { bg, bgLight, border, borderMuted } from "@/constants/colors";
import { Song, SongToSetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from 'react-native-reanimated';
import Pill from "../common/pill";
import Title from "../common/title";

export default function SongCard({
    song,
    songJoin,
    index
}:{
    song: Song,
    songJoin?: SongToSetList,
    index: number
}) {
    if (!song) return <View/>

    const currentOpenSongId = useSongToSetListStore(s => s.currentOpenSongId)
    const setOpenSongId = useSongToSetListStore(s => s.setCurrentOpenSongId)
    const currentSetListId = currentSetListStore(s => s.currentSetList?.id)
    const currentSetListName = currentSetListStore(s => s.currentSetList?.name)
    const toggleCurrentSong = () => {
        setOpenSongId(song.id);
    }

    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const updateSongsToSetlists = useSongToSetListStore(s => s.updateSongsToSetLists)
    const filteredSongJoins = songsToSetLists.filter((stsl: SongToSetList) => stsl.setlistId === currentSetListId)

    const handleEditSong = () => {}

    return(
        <Animated.View
            style={styles.cardWrapper}
            >
            <TouchableOpacity 
                style={[styles.card, {
                    borderColor: (songJoin && currentOpenSongId === song?.id) ? border : 'transparent',
                }]}
                onPress={toggleCurrentSong}>
                {songJoin ? <View style={styles.cardImg}>
                    <Title fs={20}>{songJoin?.order ?? 1}</Title>
                </View>:
                <View style={{ width: 10}} />}
                <View style={styles.innerCard}>
                    <Pill
                        fs={14}
                        c={border}
                        w={'auto'}
                        style={{ paddingHorizontal: 12.5 }}
                        m={0}
                        h={30}
                        text={song?.artist ?? ""}
                    />
                    <Title fs={18}>{song.title}</Title>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    card: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: bgLight,
        paddingRight: 10,
        borderWidth: 1
    },
    cardImg: {
        width: 35,
        height: 35,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: borderMuted
    },
    innerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        paddingVertical: 10,
    },
    downBtn: {
        paddingRight: 10,
    },
    collapsibleContent: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: bg,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 2.5
    }
});
