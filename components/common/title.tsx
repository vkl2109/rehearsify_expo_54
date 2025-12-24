import { textColor } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { DimensionValue, TextProps, TextStyle } from "react-native";
import { Text } from "./StyledText";


interface TitleProps extends TextProps {
    h?: DimensionValue
    w?: DimensionValue
    c?: string
    fs?: TextStyle["fontSize"]
    m?: DimensionValue
    p?: DimensionValue
    b?: boolean
    fw?: TextStyle["fontWeight"]
}

export default function Title({
    h = "auto",
    w = "auto",
    c = textColor,
    fs = 20,
    m = 0,
    p = 0,
    b = false,
    fw,
    children,
    style,
    ...props
}: TitleProps) {
    return(
        <Text 
        {...props}
        style={[{
            height: h,
            width: w,
            color: c,
            fontSize: fs,
            margin: m,
            padding: p,
            fontFamily: b ? fontFamily.bold : fontFamily.regular,
            fontWeight: b ? "bold" : (fw ?? "normal")
            }, 
            style
        ]}>
            {children}
        </Text>
    )
}