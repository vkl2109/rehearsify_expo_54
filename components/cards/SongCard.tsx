import { bg, bgLight, border, borderMuted, danger, success, textColor } from "@/constants/colors";
import { Song, SongToSetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { fetchSongsToSetLists, removeSongFromSetList } from "@/utils/queries";
import { AntDesign } from "@expo/vector-icons";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Button from "../common/button";
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
    const SWIPE_LIMIT = -80
    const FLING_VELOCITY = 800
    const SPRING_CONFIG = {
        damping: 30,
        stiffness: 140,
        mass: 1,
        restDisplacementThreshold: 0.5,
        restSpeedThreshold: 5,
    };

    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }]
    }));

    const panGesture = Gesture.Pan()
    .onUpdate(e => {
        translateX.value = Math.max(e.translationX, SWIPE_LIMIT);
    })
    .onEnd((e) => {
        const shouldOpen =
            translateX.value < SWIPE_LIMIT / 2 ||
            e.velocityX < -FLING_VELOCITY;

        const shouldClose =
            e.velocityX > FLING_VELOCITY;

        if (shouldOpen) {
            translateX.value = withSpring(SWIPE_LIMIT, {
            velocity: e.velocityX,
            ...SPRING_CONFIG,
            });
        } else if (shouldClose) {
            translateX.value = withSpring(0, {
            ...SPRING_CONFIG,
            velocity: e.velocityX,
            });
        } else {
            // fallback snap
            translateX.value =
            translateX.value < SWIPE_LIMIT / 2
                ? withSpring(SWIPE_LIMIT)
                : withSpring(0);
        }
    });


    const handleRemoveFromSetList = () => {
        Alert.alert(
            `Remove ${song?.title} from ${currentSetListName}?`,
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
                            setOpenSongId('')
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
        <View style={styles.swipeWrapper}>
            <View style={styles.underlay}>
                <Button
                    r={0}
                    onPress={handleRemoveFromSetList}
                    w={40}
                    p={5}
                    h={50}
                    m={0}
                    c={danger}
                    icon={<AntDesign name="delete" size={20} color={textColor} />}
                    />
                <TouchableOpacity style={styles.editBtn}
                    onPress={handleEditSong}
                    >
                    <AntDesign name="edit" size={20} color={textColor} />
                </TouchableOpacity>
            </View>
            <GestureDetector gesture={panGesture}>
                <Animated.View
                    style={[styles.cardWrapper, animatedStyle]}
                    >
                    <TouchableOpacity
                        activeOpacity={1}
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
                            <Title fs={18}>{song?.title}</Title>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    swipeWrapper: {
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    underlay: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        width: 80,
        flexDirection: 'row',
        gap: 0,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    editBtn: {
        width: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: success,
    },
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
