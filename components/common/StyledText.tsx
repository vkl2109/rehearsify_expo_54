import { defaultFontFamily } from '@/constants/fonts';
import React from 'react';
import { Text as RNText, TextInput as RNTextInput, StyleSheet, TextInputProps, TextProps } from 'react-native';

export function Text(props: TextProps) {
  return <RNText {...props} style={[styles.defaultFont, props.style]} />;
}

export function TextInput(props: TextInputProps) {
  return <RNTextInput {...props} style={[styles.defaultFont, props.style]} />;
}

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: defaultFontFamily,
  },
});
