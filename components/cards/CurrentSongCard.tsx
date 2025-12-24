import { Song } from "@/constants/types";
import { StyleSheet, View } from "react-native";
import Title from "../common/title";


function CurrentSongCard({
    currentSong
}: {
    currentSong: Song | undefined
}) {


    return (
        <View style={styles.cardWrapper}>
            <Title>{currentSong ? currentSong.title : "No Current Song"}</Title>
        </View>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    }
});

export default CurrentSongCard;