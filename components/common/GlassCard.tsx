import { bgDark, bgLight, borderMuted } from "@/constants/colors";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

type GlassCardProps = {
  children: React.ReactNode;
};

export function GlassCard({ children }: GlassCardProps) {
  return (
    <LinearGradient
      colors={[
        bgLight,  // blue tint top-left
        bgDark,  // dark bottom-right
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >

      <BlurView intensity={28} tint="dark" style={styles.blur}>
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 24,
    padding: 1, // creates soft edge highlight
    overflow: "hidden",
  },
  blur: {
    borderRadius: 24,
    overflow: "hidden",
  },
  content: {
    padding: 10,
    borderRadius: 24,

    backgroundColor: "rgba(255,255,255,0.035)",

    borderWidth: 1,
    borderColor: borderMuted,

    shadowColor: bgLight,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.45,
    shadowRadius: 32,
  },
});
