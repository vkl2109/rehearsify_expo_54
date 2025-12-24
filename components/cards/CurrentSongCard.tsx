import { bgLight, danger, success, textColor } from "@/constants/colors";
import { Song, SongToSetList } from "@/constants/types";
import { currentSetListStore } from "@/context/SetListStore";
import { useSongToSetListStore } from "@/context/SongToSetListStore";
import { fetchSongsToSetLists, removeSongFromSetList } from "@/utils/queries";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, View } from "react-native";
import Button from "../common/button";
import Pill from "../common/pill";
import Title from "../common/title";


function CurrentSongCard({
    currentSong
}: {
    currentSong: Song | undefined
}) {
    if (!currentSong) return <View/>
    const setOpenSongId = useSongToSetListStore(s => s.setCurrentOpenSongId)
    const currentSetListId = currentSetListStore(s => s.currentSetList?.id)
    const currentSetListName = currentSetListStore(s => s.currentSetList?.name)


    const songsToSetLists = useSongToSetListStore(s => s.songsToSetLists) || []
    const updateSongsToSetlists = useSongToSetListStore(s => s.updateSongsToSetLists)
    const filteredSongJoins = songsToSetLists.filter((stsl: SongToSetList) => stsl.setlistId === currentSetListId)
    const currentSongJoin = filteredSongJoins.find(stsl => stsl.songId === currentSong.id)

    const songTime = currentSong?.minutes && currentSong?.seconds ? `${currentSong.minutes}:${currentSong.seconds < 10 ? '0' + currentSong.seconds : currentSong.seconds}` : "0:00"

    const handleRemoveFromSetList = () => {
        Alert.alert(
            `Remove ${currentSong?.title} from ${currentSetListName}?`,
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
                        if (!currentSongJoin) return;
                        try {
                            if (!currentSetListId) return;
                            await removeSongFromSetList(
                                filteredSongJoins,
                                currentSongJoin
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


    return (
        <View style={styles.cardWrapper}>
            <Title>{currentSong ? currentSong.title : "No Current Song"}</Title>
            <View style={{ width: "100%" }}>
                <View style={styles.row}>
                    <Pill
                        text={songTime}
                        fs={15}
                        c={'none'}
                        icon={<AntDesign name="clock-circle" size={16} color={textColor} />}
                        />
                    <Pill
                        text={currentSong?.key.join(' | ') ?? "C Major"}
                        fs={15}
                        c={'none'}
                        icon={<Ionicons name="musical-notes" size={16} color={textColor} />}
                        />
                    <Pill
                        text={`${currentSong?.bpm ?? 120} BPM`}
                        fs={15}
                        c={'none'}
                        icon={<FontAwesome name="heartbeat" size={16} color={textColor} />}
                        />
                </View>
                <View style={styles.row}>
                    {currentSongJoin ? 
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
                        onPress={() => {}}
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
        </View>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 2.5
    }
});

export default CurrentSongCard;