import { primary } from '@/constants/colors';
import { AnimatableNumericValue, DimensionValue, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import Title from './title';


interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    w?: DimensionValue;
    h?: DimensionValue;
    r?: AnimatableNumericValue | string;
    m?: DimensionValue;
    p?: number;
    flex?: number;
    c?: string;
    fs?: TextStyle["fontSize"];
    icon?: React.ReactNode;
}

export default function Button({
    w = '90%',
    h = 'auto',
    r = 20,
    m = 10,
    p = 10,
    c = primary,
    fs = 16,
    icon,
    onPress,
    children,
    ...props
}: ButtonProps) {
    return(
        <TouchableOpacity 
        {...props}
        style={{...styles.btnContainer, 
            width: w, 
            height: h,
            borderRadius: r,
            margin: m,
            padding: p,
            backgroundColor: c,
            paddingHorizontal: p ? (p * 2) : 20,
        }} onPress={onPress}>
            {icon ? icon : <View />}
            <Title fs={fs} b >{children}</Title>
            <View />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnTxt: {
    margin: 10,
    fontSize: 16,
    fontWeight: '600',
  }
});