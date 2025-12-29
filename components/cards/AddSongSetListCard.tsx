import { border } from "@/constants/colors";
import { Song } from "@/constants/types";
import { useAddSongToSetlistStore } from "@/context/AddSongToSetlistStore";
import { Checkbox } from 'expo-checkbox';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Pill from "../common/pill";
import Title from "../common/title";


export function AddSongSetListCard({ song }: { song: Song}) {
    const isInSet = useAddSongToSetlistStore(s => s.songInSet(song.id));
    const addSongInSet = useAddSongToSetlistStore(s => s.addSong);
    const removeSongInSet = useAddSongToSetlistStore(s => s.removeSong);

    const setChecked = (newValue: boolean) => {
        if (newValue) {
            addSongInSet(song.id);
        } else {
            removeSongInSet(song.id);
        }
    }

    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={() => setChecked(!isInSet)}>
            <View style={styles.group}>
                <Checkbox style={styles.checkbox} value={isInSet} onValueChange={setChecked} />
                <Pill
                    fs={14}
                    c={border}
                    w={'auto'}
                    h={30}
                    text={song?.artist ?? ""}
                />
            </View>
            <Title>{song?.title ?? "test"}</Title>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 5,
    },
    checkbox: {

    },
    group: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
});
