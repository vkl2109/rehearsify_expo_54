import { bgLight, border, textColor } from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { DimensionValue, StyleSheet, TextInput, TouchableOpacity, View, ViewProps } from "react-native";


interface InputProps extends ViewProps {
    w?: DimensionValue,
    h?: DimensionValue,
    r?: number,
    icon?: ReactNode,
    c?: string,
    bg?: string
    placeholder?: string,
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
}

export default function Input({
    w = '100%',
    h = 50,
    r = 100,
    c = border,
    bg = bgLight,
    icon,
    placeholder,
    input,
    setInput,
    ...props
}: InputProps) {
    const [ isFocused, setIsFocused ] = useState(false);

    return(
        <View style={[
            styles.searchBarWrapper, 
            {
                width: w,
                height: h,
                borderRadius: r,
                borderColor: isFocused ? c : 'transparent',
                backgroundColor: bg
            }
        ]} {...props}>
          {icon}
          <TextInput
            placeholder={placeholder}
            onChangeText={newText => setInput(newText)}
            defaultValue={input}
            placeholderTextColor={c}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.searchBar, {
              color: textColor,
            }]}
            />
            {input != '' && <TouchableOpacity onPress={() => setInput('')}>
              <Entypo name="cross" size={24} color={c} />
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
  searchBarWrapper: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    height: '100%',
    fontSize: 24,
    marginLeft: 10,
  },
});