import { bg, bgLight, border, highlight } from "@/constants/colors";
import { Song } from "@/constants/types";
import AntDesign from '@expo/vector-icons/AntDesign';
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
                        w={50}
                        text={song.artist}
                        />
                    <Title fs={18}>{song.title}</Title>
                </View>
                <View style={styles.rightColumn}>
                    <TouchableOpacity>
                        <AntDesign name="down" size={24} color={highlight} />
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
        height: 75,
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardImg: {
        width: 50,
        height: 50,
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
        justifyContent: 'center'
    }
})