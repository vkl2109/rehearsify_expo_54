import { info } from "@/constants/colors";
import { DimensionValue, StyleSheet, Text, View, ViewProps } from "react-native";

interface PillProps extends ViewProps {
    h?: DimensionValue
    w?: DimensionValue
    c?: string
    m?: DimensionValue
    p?: DimensionValue
    fs?: number
    icon?: React.ReactNode
    text: string,
}

export default function Pill({
    h = 'auto',
    w = 'auto',
    c = info,
    fs = 10,
    m = 0,
    p = 5,
    text,
    icon,
    style
}: PillProps) {
    return(
        <View style={[style, styles.pillWrapper, {
            height: h, 
            width: w, 
            backgroundColor: c,
            margin: m,
            padding: p,
            paddingHorizontal: typeof p === "number" ? p * 2 : 10
        }]}>
            {icon}
            <Text style={{...styles.pillText,
                fontSize: fs,
                marginLeft: icon ? 5 : 0
            }}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pillWrapper: {
        borderRadius: 100,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pillText: {
        color: 'white',
    },
});

