import { primary } from '@/constants/colors';
import { AnimatableNumericValue, DimensionValue, StyleSheet, TouchableOpacity } from 'react-native';
import Title from './title';


interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    w?: DimensionValue;
    h?: DimensionValue;
    r?: AnimatableNumericValue | string;
    m?: DimensionValue;
    p?: DimensionValue;
    flex?: number;
    c?: string;
    fs?: DimensionValue;
}

export default function Button({
    w = '90%',
    h = 'auto',
    r = 20,
    m = 10,
    p = 10,
    c = primary,
    fs = 16,
    onPress,
    children
}: ButtonProps) {
    return(
        <TouchableOpacity style={{...styles.btnContainer, 
            width: w, 
            height: h,
            borderRadius: r,
            margin: m,
            padding: p,
            backgroundColor: c
        }} onPress={onPress}>
            <Title fs={fs} b >{children}</Title>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    margin: 10,
    fontSize: 16,
    fontWeight: '600',
  }
});