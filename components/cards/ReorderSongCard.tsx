import { bgLight, border, textColor } from "@/constants/colors";
import { Song } from "@/constants/types";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Title from "../common/title";

const ROW_HEIGHT = 60

export function ReorderSongCard({
    song,
    positions,
    moveItem,
}:{
    song: Song,
    positions: Map<string, number>,
    moveItem: (id: string, from: number, to: number) => void,
}) {
    const translateY = useSharedValue(0)
    const isDragging = useSharedValue(false)

    // const gesture = Gesture.Pan()
    // .onBegin(() => {
    //   isDragging.value = true
    // })
    // .onUpdate((e) => {
    //   translateY.value = e.translationY

    //   const currentOrder = positions.get(song.id) ?? 0

    //   const newIndex = Math.round(
    //     (currentOrder * ROW_HEIGHT + e.translationY) /
    //       ROW_HEIGHT
    //   )

    //   const clamped = Math.max(
    //     0,
    //     Math.min(newIndex, Object.keys(positions.size).length - 1)
    //   )

    //   if (clamped !== currentOrder) {
    //     moveItem(song.id, currentOrder, clamped)

    //     positions.set(song.id, clamped)
    //   }
    // })
    // .onEnd(() => {
    //   translateY.value = withTiming(0)
    //   isDragging.value = false
    // })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        zIndex: isDragging.value ? 100 : 0
    }))

    return(
        <Animated.View
        style={[animatedStyle, styles.wrapper]}
        >
            <Title>{song.title}</Title>
            {/* <GestureDetector gesture={gesture}> */}
                <AntDesign name="menu" size={24} color={textColor} />
            {/* </GestureDetector> */}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        padding: 10,
        height: ROW_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: border,
        backgroundColor: bgLight,
        gap: 10,
    },
});