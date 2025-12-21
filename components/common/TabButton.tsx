import { bgLight, border } from '@/constants/colors';
import { TabTriggerSlotProps } from 'expo-router/ui';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabButtonProps extends TabTriggerSlotProps {
  icon: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  side?: 'left' | 'right';
}

export function TabButton({ isFocused, icon, style, onPress, side }: TabButtonProps) {
  const insets = useSafeAreaInsets()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.outerBtn,
        {
            paddingBottom: insets.bottom,
            height: 50 + insets.bottom,
            alignItems: side === 'right' ? 'flex-start' : 'flex-end'
        },
        style,
      ]}
    >
      <View style={[
        side === 'left' ? styles.leftTabBtn : styles.rightTabBtn,
        {
          backgroundColor: isFocused ? border : bgLight,
        },
      ]}>
        {icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerBtn: {
    justifyContent: 'center',
  },
  leftTabBtn: {
    height: 50,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderWidth: 0.5,
  },
  rightTabBtn: {
    height: 50,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 0.5,
  },
});
