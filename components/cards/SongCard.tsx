import { bg, bgLight, border, textMuted } from "@/constants/colors";
import { Song } from "@/constants/types";
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Pill from "../common/pill";
import Title from "../common/title";


export default function SongCard({
    song
}:{
    song: Song
}) {
    return(
        <View style={styles.cardWrapper}>
            <View style={{...styles.card,
                backgroundColor: bg
            }}>
                <View style={{
                    ...styles.cardImg,
                    backgroundColor: bgLight
                    }}>
                    <Title fs={30}>1</Title>
                </View>
                <View style={styles.innerCard}>
                    <Pill
                        fs={14}
                        c={border}
                        w={75}
                        text={song.artist}
                        />
                    <Title>{song.title}</Title>
                </View>
                <View style={styles.rightColumn}>
                    <TouchableOpacity>
                        <Entypo name="dots-three-horizontal" size={24} color={textMuted} />
                    </TouchableOpacity>
                </View>
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
        width: '100%',
        height: 100,
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardImg: {
        width: 80,
        height: 80,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    innerCard: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 1,
        height: '100%',
        paddingVertical: 10,
    },
    rightColumn: {
        width: 'auto',
        height: '100%',
        padding: 10,
        paddingRight: 15,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    }
})