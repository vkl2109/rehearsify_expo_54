import { borderMuted, textColor, textMuted } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { DimensionValue, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import Title from "./title";

interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  w?: DimensionValue
}

export default function FloatingDropdown({ 
    options,
    selected,
    setSelected, 
    placeholder,
    w = '100%'
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const height = useSharedValue(0);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    height.value = withTiming(open ? 0 : Math.min(options.length * 40, 200), { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: withTiming(open ? 1 : 0),
  }));

  return (
    <View style={{ width: w }}>
      {/* Dropdown Header */}
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="musical-notes" size={20} color={textColor} />
            <Title fs={20} c={selected ? textColor : textMuted}>{selected || placeholder || "Select..."}</Title>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color={textColor}/>
      </TouchableOpacity>

      {/* Floating Dropdown */}
      {open && (
        <Animated.View style={[styles.dropdown, animatedStyle]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setSelected(item);
                  toggleDropdown();
                }}
              >
                <Title fs={20}>{item}</Title>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: borderMuted,
    zIndex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 50, // height of header
    left: 0,
    right: 0,
    zIndex: 999, // make sure it's on top
    borderRadius: 20,
    backgroundColor: borderMuted,
    overflow: "hidden",
    maxHeight: 200, // limit height
  },
  item: {
    padding: 12,
  }
});
