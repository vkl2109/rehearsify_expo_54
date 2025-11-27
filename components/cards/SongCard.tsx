import { bgLight, border, borderMuted, highlight } from "@/constants/colors";
import { Song, SongToSetList } from "@/constants/types";
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    
    return(
        <View style={styles.cardWrapper}>
            <View style={styles.card}>
                <View style={styles.cardImg}>
                    <Title fs={20}>{songJoin?.order ?? 1}</Title>
                </View>
                <View style={styles.innerCard}>
                    <Pill
                        fs={14}
                        c={border}
                        w={'auto'}
                        style={{ paddingHorizontal: 12.5 }}
                        m={0}
                        h={30}
                        text={song.artist}
                        />
                    <Title fs={18}>{song.title}</Title>
                    <TouchableOpacity style={styles.downBtn}>
                        <Entypo name="chevron-down" size={24} color={highlight} />
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
        flexDirection: 'column',
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
    rightColumn: {
        width: 'auto',
        height: '100%',
        padding: 10,
        paddingRight: 15,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    downBtn: {
        paddingRight: 10,
    }
})