import { primary, textColor } from '@/constants/colors';
import { AnimatableNumericValue, DimensionValue, StyleSheet, Text, TouchableOpacity } from 'react-native';


interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    w?: DimensionValue;
    h?: DimensionValue;
    r?: AnimatableNumericValue | string;
    m?: DimensionValue;
    p?: DimensionValue;
    flex?: number;
}

export default function Button({
    w = '90%',
    h = 'auto',
    r = 20,
    m = 10,
    p = 10,
    onPress
}: ButtonProps) {
    return(
        <TouchableOpacity style={{...styles.btnContainer, 
            width: w, 
            height: h,
            borderRadius: r,
            margin: m,
            padding: p,
            backgroundColor: primary
        }} onPress={onPress}>
            <Text style={{...styles.btnTxt,
              color: textColor
            }}>Press Me</Text>
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