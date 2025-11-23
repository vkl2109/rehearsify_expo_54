import { bgLight, border, textColor } from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Dispatch, SetStateAction, useState } from "react";
import { DimensionValue, StyleSheet, TextInput, TouchableOpacity, View, ViewProps } from "react-native";


interface InputProps extends ViewProps {
    w?: DimensionValue,
    r?: number,
    icon?: React.ReactNode,
    placeholder?: string,
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
}

export default function Input({
    w = '100%',
    r = 100,
    icon,
    placeholder,
    search,
    setSearch,
    ...props
}: InputProps) {
    const [ isFocused, setIsFocused ] = useState(false);

    return(
        <View style={[
            styles.searchBarWrapper, 
            isFocused && styles.focusedBar,
            {
                width: w,
                borderRadius: r
            }
        ]} {...props}>
          {icon}
          <TextInput
            placeholder="search"
            onChangeText={newText => setSearch(newText)}
            defaultValue={search}
            placeholderTextColor={border}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.searchBar}
            />
            {search != '' && <TouchableOpacity onPress={() => setSearch('')}>
              <Entypo name="cross" size={24} color={border} />
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
  searchBarWrapper: {
    margin: 10,
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: 'none',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: bgLight
  },
  focusedBar: {
    borderColor: border
  },
  searchBar: {
    flex: 1,
    height: '100%',
    fontSize: 24,
    marginLeft: 10,
    color: textColor,
  },
});