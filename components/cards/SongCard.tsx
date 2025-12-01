import { bg, bgLight, border, borderMuted, danger, highlight, success, textColor } from "@/constants/colors";
import { Song, SongToSetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { fetchSongsToSetLists, removeSongFromSetList } from "@/utils/queries";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Button from "../common/button";
import Pill from "../common/pill";
import Title from "../common/title";

export default function SongCard({
    song,
    songJoin
}:{
    song: Song,
    songJoin?: SongToSetList
}) {
    if (!song) return <View/>

    const [expanded, setExpanded] = useState(false);
    const height = useSharedValue(0);
    const opacity = useSharedValue(0);
    const currentSetListId = currentSetListStore(s => s.currentSetList?.id)
    const currentSetListName = currentSetListStore(s => s.currentSetList?.name)

    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const updateSongsToSetlists = useSongToSetListStore(s => s.updateSongsToSetLists)
    const filteredSongJoins = songsToSetLists.filter((stsl: SongToSetList) => stsl.setlistId === currentSetListId)

    const toggleExpand = () => {
        setExpanded(!expanded);
        height.value = withTiming(expanded ? 0 : 75, { duration: 300 });
        opacity.value = withTiming(expanded ? 0 : 1, { duration: 600 });
    }

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: opacity.value
    }));

    const songTime = song?.minutes && song?.seconds ? `${song.minutes}:${song.seconds < 10 ? '0' + song.seconds : song.seconds}` : "0:00"

    const handleRemoveFromSetList = () => {
        Alert.alert(
            `Remove ${song.title} from ${currentSetListName}?`,
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
                        if (!songJoin) return;
                        try {
                            if (!currentSetListId) return;
                            await removeSongFromSetList(
                                filteredSongJoins,
                                songJoin
                            )
                            const latestJoins = await fetchSongsToSetLists(currentSetListId)
                            updateSongsToSetlists(latestJoins, currentSetListId);
                        } catch (error) {
                            console.error("Error removing song from set list:", error);
                            alert("Failed to remove song from set list. Please try again.");
                        }
                    },
                },
            ]
        )
    }

    const handleEditSong = () => {}

    return(
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
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
                    <TouchableOpacity style={styles.downBtn} onPress={toggleExpand}>
                        <Entypo name={expanded ? "chevron-up" : "chevron-down"} size={24} color={highlight} />
                    </TouchableOpacity>
                </View>
            </View>
            <Animated.View style={[styles.collapsibleContent, animatedStyle]}>
                <View style={{ width: "100%" }}>
                    <View style={styles.row}>
                        <Pill
                            text={songTime}
                            fs={15}
                            c={'none'}
                            icon={<AntDesign name="clock-circle" size={16} color={textColor} />}
                            />
                        <Pill
                            text={song?.key.join(' | ') ?? "C Major"}
                            fs={15}
                            c={'none'}
                            icon={<Ionicons name="musical-notes" size={16} color={textColor} />}
                            />
                        <Pill
                            text={`${song?.bpm ?? 120} BPM`}
                            fs={15}
                            c={'none'}
                            icon={<FontAwesome name="heartbeat" size={16} color={textColor} />}
                            />
                    </View>
                    <View style={styles.row}>
                        {songJoin ? 
                        <Button
                            onPress={handleRemoveFromSetList}
                            m={0}
                            p={7.5}
                            w={110}
                            c={bgLight}
                            fs={14}
                            h={35}
                            icon={<AntDesign name="delete" size={16} color={danger} />}
                            noRightSpace
                            >
                            Remove
                        </Button>
                        : <View />}
                        <Button
                            onPress={handleEditSong}
                            m={0}
                            p={5}
                            w={70}
                            c={bgLight}
                            fs={14}
                            h={35}
                            icon={<AntDesign name="edit" size={16} color={success} />}
                            noRightSpace
                            >
                            Edit
                        </Button>
                    </View>
                </View>
            </Animated.View>
        </View>
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
        backgroundColor: bgLight
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
