import { bgLight } from '@/constants/colors';
import { TabTriggerSlotProps } from 'expo-router/ui';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabButtonProps extends TabTriggerSlotProps {
  icon: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function TabButton({ isFocused, icon, style, onPress }: TabButtonProps) {
  const insets = useSafeAreaInsets()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabBtn,
        { 
            paddingBottom: insets.bottom,
            height: 50 + insets.bottom
        },
        style,
        isFocused && styles.activeTab
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 10,
  },
  activeTab: {
    backgroundColor: bgLight
  },
});
