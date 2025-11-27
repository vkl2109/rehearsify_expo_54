import { border, primary, secondary } from "@/constants/colors";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface ProgressBarProps {
  progress: number; // 0 → 1
  height?: number;
  backgroundColor?: string;
  startColor?: string;
  endColor?: string;
  duration?: number;
}

export default function Progress({
  progress, // 0 → 1
  height = 12,
  backgroundColor = border,
  startColor = primary,
  endColor = secondary,
  duration = 600,
}: ProgressBarProps) {
  const animated = useSharedValue(0);

  useEffect(() => {
    animated.value = withTiming(progress, { duration });
  }, [progress]);

  // Main bar width + color transition
  const barStyle = useAnimatedStyle(() => ({
    width: `${animated.value * 100}%`,
    backgroundColor: interpolateColor(
      animated.value,
      [0, 1],
      [startColor, endColor]
    ),
  }));

  return (
    <View style={[styles.track, { height, backgroundColor }]}>
      <Animated.View style={[styles.bar, barStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 50,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
  },
  shimmer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 40,
    backgroundColor: "rgba(255,255,255,0.5)",
    transform: [{ rotate: "45deg" }],
  },
  glow: {
    position: "absolute",
    right: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
    shadowColor: "white",
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  }
});
