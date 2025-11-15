import { Song } from "@/constants/types";
import { StyleSheet, View } from "react-native";
import Title from "../common/title";


export default function SongCard({
    song
}:{
    song: Song
}) {
    return(
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
                <Title>{song.title}</Title>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '90%',
        height: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})