import { bgLight, borderMuted, textColor } from "@/constants/colors";
import React, { useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Text } from "./StyledText";

export type SegmentItem = {
  index: number;
  label: string;
};

type SegmentControlProps = {
  data: SegmentItem[];
  selected: string;
  setSelected: (value: string) => void;
};

export function SegmentControl({ data, selected, setSelected }: SegmentControlProps) {
  const [index, setIndex] = useState<number>(0);
  const { width } = useWindowDimensions();

  const leftAnim = useSharedValue<number>(0);

  useEffect(() => {
    const segmentWidth = (width * 0.9) / data.length;

    leftAnim.value = withSpring(index * segmentWidth, {
      mass: 1,
      damping: 20,
      stiffness: 200,
      overshootClamping: true,
    });

    setSelected(data[index].label);
  }, [index, width]);

  return (
    <View style={styles.wrapper}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.index}
          style={styles.btn}
          onPress={() => setIndex(item.index)}
        >
          <Text style={styles.unselectedTxt}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      <Animated.View
        style={[
          movingBtn(width, data.length),
          {
            left: leftAnim,
          },
        ]}
      >
        <Text style={styles.selectedTxt}>{selected}</Text>
      </Animated.View>
    </View>
  );
}

const movingBtn = (width: number, count: number): StyleProp<ViewStyle> => {
  return {
    position: "absolute",
    top: 0,
    height: 40,
    margin: 5,
    width: width / count - 20,
    borderRadius: 100,
    padding: 5,
    backgroundColor: borderMuted,
    justifyContent: "center",
    alignItems: "center",
  };
};

//
// Styles
//
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    margin: 5,
    padding: 2.5,
    height: 50,
    borderRadius: 100,
    backgroundColor: bgLight,
    flexDirection: "row",
  },
  innerWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 7.5,
    borderWidth: 2.5,
    borderColor: "#F0ECE5",
    flexDirection: "row",
  },
  innerBtn: {
    backgroundColor: "#F0ECE5",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: textColor,
  },
  unselectedTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F0ECE5",
  },
});
