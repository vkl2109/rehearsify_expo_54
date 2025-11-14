import { textColor } from "@/constants/colors";
import { DimensionValue, Text, TextProps } from "react-native";


interface TitleProps extends TextProps {
    h?: DimensionValue
    w?: DimensionValue
    c?: string
    fs?: number
    m?: DimensionValue
    p?: DimensionValue
}

export default function Title({
    h = "auto",
    w = "auto",
    c = textColor,
    fs = 20,
    m = 0,
    p = 0,
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
            padding: p
            }, 
            style
        ]}>
            {children}
        </Text>
    )
}