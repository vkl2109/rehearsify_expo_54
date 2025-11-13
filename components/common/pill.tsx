import { info } from "@/constants/colors";
import { DimensionValue, StyleSheet, Text, View, ViewProps } from "react-native";

interface PillProps extends ViewProps {
    h?: DimensionValue
    w?: DimensionValue
    c?: string
    fs?: number
    text: string,
}

export default function Pill({
    h = 50,
    w = 100,
    c = info,
    fs = 10,
    text
}: PillProps) {
    return(
        <View style={{...styles.pillWrapper, 
            height: h, 
            width: w, 
            backgroundColor: c
        }}>
            <Text style={{...styles.pillText,
                fontSize: fs
            }}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pillWrapper: {
        borderRadius: 100,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillText: {
        color: 'white',
    },
});

