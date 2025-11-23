import { textMuted } from "@/constants/colors";
import React from "react";
import { DimensionValue, StyleSheet, View, ViewProps } from "react-native";
import Title from "./title";

interface DividerProps extends ViewProps {
  children: React.ReactNode;
  w?: DimensionValue;
}

export default function Divider({ w = "100%", children, style, ...props }: DividerProps) {
  return (
    <View
      {...props}
      style={[styles.container, { width: w }, style]}
    >
      <View style={styles.bar} />
      <Title fw={100} fs={18} c={textMuted}>
        {children}
      </Title>
      <View style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 10,
  },
  bar: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: textMuted,
  },
});
