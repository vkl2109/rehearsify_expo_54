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
            padding: p
        }} onPress={onPress}>
            <Text style={styles.btnTxt}>Press Me</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  btnTxt: {
    margin: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});