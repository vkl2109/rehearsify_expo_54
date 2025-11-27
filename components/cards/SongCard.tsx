import { bgLight, border, borderMuted, highlight } from "@/constants/colors";
import { Song, SongToSetList } from "@/constants/types";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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

    const toggleExpand = () => {
        setExpanded(!expanded);
        height.value = withTiming(expanded ? 0 : 80, { duration: 300 });
    }

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value
    }));

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
                        text={song?.artist ?? ""}
                    />
                    <Title fs={18}>{song.title}</Title>
                    <TouchableOpacity style={styles.downBtn} onPress={toggleExpand}>
                        <Entypo name={expanded ? "chevron-up" : "chevron-down"} size={24} color={highlight} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Collapsible content */}
            <Animated.View style={[styles.collapsibleContent, animatedStyle]}>
                <View style={styles.topRow}>
                    <Pill
                        text={song?.type ?? "Original"}
                        fs={15}
                        />
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
        backgroundColor: borderMuted,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    }
});
