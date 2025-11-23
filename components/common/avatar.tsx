import { primary, textColor } from "@/constants/colors"
import { DimensionValue, StyleSheet, View } from "react-native"
import Title from "./title"


export default function Avatar({
    name,
    bg = primary,
    c = textColor,
    size = 25,
    m = 5,
    p = 0
}: {
    name: string,
    bg?: string,
    c?: string,
    size?: DimensionValue,
    m?: DimensionValue,
    p?: DimensionValue
}) {
    const fontSize = size ? Number(size) * 0.6 : 20
    return(
        <View style={{
            ...styles.avatarImg,
            backgroundColor: bg,
            height: size,
            width: size,
            margin: m,
            padding: p
        }}>
            <Title c={c} fs={fontSize}>{name}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarImg: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})