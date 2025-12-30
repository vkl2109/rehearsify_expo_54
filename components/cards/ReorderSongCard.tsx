import { bgLight, border, textColor } from "@/constants/colors";
import { Song } from "@/constants/types";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Title from "../common/title";

const ROW_HEIGHT = 50

export function ReorderSongCard({
    song,
    positions,
}:{
    song: Song,
    positions: SharedValue<Record<string, number>>,
}) {
    const translateY = useSharedValue(0)
    const isDragging = useSharedValue(false)

    const gesture = Gesture.Pan()
    .onBegin(() => {
        isDragging.value = true;
    })
    .onUpdate((e) => {
        translateY.value = e.translationY;

        const currentIndex = positions.value[song.id];
        const maxIndex = Object.keys(positions.value).length - 1;

        const newIndex = Math.round(
        (currentIndex * ROW_HEIGHT + e.translationY) / ROW_HEIGHT
        );

        const clampedIndex = Math.max(
        0,
        Math.min(newIndex, maxIndex)
        );

        if (clampedIndex === currentIndex) return;

        const newPositions = { ...positions.value };

        // swap items
        Object.keys(newPositions).forEach((key) => {
        if (newPositions[key] === clampedIndex) {
            newPositions[key] = currentIndex;
        }
        });

        newPositions[song.id] = clampedIndex;
        positions.value = newPositions;
    })
    .onEnd(() => {
        translateY.value = withTiming(0);
        isDragging.value = false;

        // single bridge call after gesture completes
        // scheduleOnRN(onReorderComplete, positions.value);
    });

    const animatedStyle = useAnimatedStyle(() => {
        const index = positions.value[song.id];

        if (index === undefined) {
            return { opacity: 0 };
        }

        return {
            top: index * ROW_HEIGHT,
            transform: [
                { 
                    translateY: isDragging.value ? translateY.value : 0 
                },
            ],
        };
    });

    return(
        <Animated.View
        style={[
            animatedStyle,
            styles.wrapper
        ]}
        >
            <Title>{song.title}</Title>
            <GestureDetector gesture={gesture}>
                <AntDesign name="menu" size={16} color={textColor} />
            </GestureDetector>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
        height: ROW_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: border,
        backgroundColor: bgLight,
        gap: 10,
        position: "absolute",
        top: Math.random() * 300
    },
});