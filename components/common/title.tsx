import { textColor } from "@/constants/colors";
import { DimensionValue, Text, TextProps, TextStyle } from "react-native";


interface TitleProps extends TextProps {
    h?: DimensionValue
    w?: DimensionValue
    c?: string
    fs?: number
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
            fontWeight: b ? "bold" : (fw ?? "normal")
            }, 
            style
        ]}>
            {children}
        </Text>
    )
}