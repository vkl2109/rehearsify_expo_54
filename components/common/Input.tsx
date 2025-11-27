import { bgLight, border, textColor } from "@/constants/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from "@expo/vector-icons/Entypo";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View
} from "react-native";

type InputVariant = "text" | "email" | "password" | "search";

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  w?: DimensionValue;
  h?: DimensionValue;
  r?: number;
  icon?: ReactNode;
  c?: string;
  pc?: string;
  bg?: string;
  placeholder?: string;
  fs?: TextStyle["fontSize"];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

export default function Input({
  variant = "text",
  w = "100%",
  h = 50,
  r = 100,
  c = border,
  bg = bgLight,
  pc = border,
  fs = 24,
  icon,
  placeholder,
  input,
  setInput,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const config: TextInputProps = (() => {
    switch (variant) {
      case "email":
        return {
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCorrect: false,
          textContentType: "emailAddress" as TextInputProps["textContentType"],
          autoComplete: "email" as TextInputProps["autoComplete"],
          secureTextEntry: false,
        };

      case "password":
        return {
          keyboardType: "default",
          autoCapitalize: "none",
          autoCorrect: false,
          textContentType: "password" as TextInputProps["textContentType"],
          autoComplete: "password" as TextInputProps["autoComplete"],
          secureTextEntry: !showPassword,
        };

      case "search":
        return {
          keyboardType: "default",
          autoCapitalize: "none",
          autoCorrect: false,
          textContentType: "none" as TextInputProps["textContentType"],
          autoComplete: "off" as TextInputProps["autoComplete"],
          secureTextEntry: false,
        };

      default:
        return {};
    }
  })();


  return (
    <View
      style={[
        styles.wrapper,
        {
          width: w,
          height: h,
          borderRadius: r,
          borderColor: isFocused ? c : "transparent",
          backgroundColor: bg,
        },
      ]}
    >
      {icon}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={pc}
        value={input}
        onChangeText={setInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, style, { fontSize: fs, color: textColor }]}
        {...config}
        {...props}
      />

      {/* Clear button for search/email */}
      {input !== "" && (
        <TouchableOpacity onPress={() => setInput("")}>
          <AntDesign name="close-circle" size={18} color={pc} />
        </TouchableOpacity>
      )}

      {/* Password show/hide */}
      {variant === "password" && (
        <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
          <Entypo
            name={showPassword ? "eye" : "eye-with-line"}
            size={22}
            color={pc}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
});
